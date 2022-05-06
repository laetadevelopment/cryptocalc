package v1

import (
  "context"

  "github.com/golang/protobuf/ptypes"
  "github.com/satori/go.uuid"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"

  "github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/api/v1"
)

const (
  apiVersion = "v1"
)

type conversionServiceServer struct {
  db *mongo.Client
}

// MongoRepository implementation
type MongoRepository struct {
  collection *mongo.Collection
}

// NewConversionServiceServer connects to MongoDB
func NewConversionServiceServer(db *mongo.Client) v1.ConversionServiceServer {
  return &conversionServiceServer{db: db}
}

func (s *conversionServiceServer) checkAPI(api string) error {
  if len(api) > 0 {
    if apiVersion != api {
      return status.Errorf(codes.Unimplemented,
        "unsupported API version: service implements API version '%s', but asked for '%s'", apiVersion, api)
    }
  }
  return nil
}

// Create a new conversion in MongoDB
func (s *conversionServiceServer) Create(ctx context.Context, req *v1.CreateRequest) (*v1.CreateResponse, error) {
  if err := s.checkAPI(req.Api); err != nil {
    return nil, err
  }

  c := s.db.Database("conversions").Collection("conversion")

  conversionId := uuid.NewV1().String()

  p := v1.Conversion{
    Id:         conversionId,
    Address:    req.Conversion.Address,
    Amount:     req.Conversion.Amount,
    From:       req.Conversion.From,
    To:         req.Conversion.To,
    Value:      req.Conversion.Value,
    Total:      req.Conversion.Total,
    Created:    ptypes.TimestampNow(),
    Updated:    ptypes.TimestampNow(),
  }

  _, err := c.InsertOne(ctx, &p)
  if err != nil {
    return nil, status.Error(codes.Unknown, "failed to insert into Conversions.conversion-> "+err.Error())
  }

  return &v1.CreateResponse{
    Api:        apiVersion,
    Id:         conversionId,
  }, nil
}

// Read a conversion in MongoDB
func (s *conversionServiceServer) Read(ctx context.Context, req *v1.ReadRequest) (*v1.ReadResponse, error) {
  if err := s.checkAPI(req.Api); err != nil {
    return nil, err
  }

  c := s.db.Database("conversions").Collection("conversion")

  filter := bson.D{{"id", req.Id}}

  var p v1.Conversion

  err := c.FindOne(context.TODO(), filter).Decode(&p)
  if err != nil {
    return nil, status.Error(codes.Unknown, "failed to find document-> "+err.Error())
  }

  return &v1.ReadResponse{
    Api:        apiVersion,
    Conversion: &p,
  }, nil

}

// Update a conversion in MongoDB
func (s *conversionServiceServer) Update(ctx context.Context, req *v1.UpdateRequest) (*v1.UpdateResponse, error) {
  if err := s.checkAPI(req.Api); err != nil {
    return nil, err
  }

  c := s.db.Database("conversions").Collection("conversion")

  filter := bson.D{{"id", req.Conversion.Id}}
  update := bson.D{
    {"$set", bson.D{
      {"items", req.Conversion.Items},
      {"updated", ptypes.TimestampNow()},
    }},
  }

  updateResult, err := c.UpdateOne(context.TODO(), filter, update)
  if err != nil {
    return nil, status.Error(codes.Unknown, "failed to update document-> "+err.Error())
  }

  u := updateResult.ModifiedCount

  return &v1.UpdateResponse{
    Api:        apiVersion,
    Updated:    u,
  }, nil
}

// Delete a conversion in MongoDB
func (s *conversionServiceServer) Delete(ctx context.Context, req *v1.DeleteRequest) (*v1.DeleteResponse, error) {
  if err := s.checkAPI(req.Api); err != nil {
    return nil, err
  }

  c := s.db.Database("conversions").Collection("conversion")

  filter := bson.D{{"id", req.Id}}

  deleteResult, err := c.DeleteOne(context.TODO(), filter)
  if err != nil {
    return nil, status.Error(codes.Unknown, "failed to delete document-> "+err.Error())
  }

  d := deleteResult.DeletedCount

  return &v1.DeleteResponse{
    Api:        apiVersion,
    Deleted:    d,
  }, nil
}

// List all conversions available via MongoDB Client
func (s *conversionServiceServer) List(ctx context.Context, req *v1.ListRequest) (*v1.ListResponse, error) {
  if err := s.checkAPI(req.Api); err != nil {
    return nil, err
  }

  c := s.db.Database("conversions").Collection("conversion")

  findOptions := options.Find()
  var list []*v1.Conversion

  cur, err := c.Find(context.TODO(), bson.D{{}}, findOptions)
  if err != nil {
    return nil, status.Error(codes.Unknown, "failed to find documents in Conversions.conversion-> "+err.Error())
  }

  for cur.Next(context.TODO()) {
    var elem v1.Conversion
    err := cur.Decode(&elem)
    if err != nil {
      return nil, status.Error(codes.Unknown, "failed to decode document-> "+err.Error())
    }

    list = append(list, &elem)
  }

  if err := cur.Err(); err != nil {
    return nil, status.Error(codes.Unknown, "failed reading documents-> "+err.Error())
  }

  cur.Close(context.TODO())

  return &v1.ListResponse{
    Api:        apiVersion,
    Data:       list,
  }, nil
}
