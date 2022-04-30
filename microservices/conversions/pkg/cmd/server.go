package cmd

import (
	"context"
	"flag"
	"fmt"

	"github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/datastore"
	"github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/logger"
	"github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/protocol/grpc"
	"github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/protocol/rest"
	"github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/service/v1"
)

// Config for microservice
type Config struct {
	GRPCPort            string
	HTTPPort            string
	DatastoreDBHost     string
	DatastoreDBUser     string
	DatastoreDBPassword string
	DatastoreDBSchema   string
	LogLevel            int
	LogTimeFormat       string
}

// RunServer for microservice
func RunServer() error {
	ctx := context.Background()

	var cfg Config
	flag.StringVar(&cfg.GRPCPort, "grpc-port", "", "gRPC port to bind")
	flag.StringVar(&cfg.HTTPPort, "http-port", "", "HTTP port to bind")
	flag.StringVar(&cfg.DatastoreDBHost, "db-host", "", "Database host")
	flag.IntVar(&cfg.LogLevel, "log-level", 0, "Global log level")
	flag.StringVar(&cfg.LogTimeFormat, "log-time-format", "",
		"Print time format for logger e.g. 2006-01-02T15:04:05Z07:00")
	flag.Parse()

	if len(cfg.GRPCPort) == 0 {
		return fmt.Errorf("invalid TCP port for gRPC server: '%s'", cfg.GRPCPort)
	}

	if len(cfg.HTTPPort) == 0 {
		return fmt.Errorf("invalid TCP port for HTTP gateway: '%s'", cfg.HTTPPort)
	}

	if err := logger.Init(cfg.LogLevel, cfg.LogTimeFormat); err != nil {
		return fmt.Errorf("failed to initialize logger: %v", err)
	}

	db, err := datastore.CreateClient(cfg.DatastoreDBHost)
	if err != nil {
		return fmt.Errorf("failed to open mongodb connection: %v", err)
	}
	defer db.Disconnect(context.TODO())

	v1API := v1.NewConversionServiceServer(db)

	go func() {
		_ = rest.RunServer(ctx, cfg.GRPCPort, cfg.HTTPPort)
	}()

	return grpc.RunServer(ctx, v1API, cfg.GRPCPort)
}
