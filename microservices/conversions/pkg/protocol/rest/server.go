package rest

import (
    "context"
    "net/http"
    "os"
    "os/signal"
    "time"

    "github.com/grpc-ecosystem/grpc-gateway/runtime"
    "github.com/rs/cors"
    "go.uber.org/zap"
    "google.golang.org/grpc"

    "github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/api/v1"
    "github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/logger"
    "github.com/laetadevelopment/cryptocalc/microservices/conversions/pkg/protocol/rest/middleware"
)

func RunServer(ctx context.Context, grpcPort, httpPort string) error {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    mux := runtime.NewServeMux()
    opts := []grpc.DialOption{grpc.WithInsecure()}
    if err := v1.RegisterConversionServiceHandlerFromEndpoint(ctx, mux, "localhost:"+grpcPort, opts); err != nil {
        logger.Log.Fatal("failed to start HTTP gateway", zap.String("reason", err.Error()))
    }

    co := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedHeaders: []string{"*"},
        AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
        Debug:          true,
    })

    srv := &http.Server{
        Addr:    ":" + httpPort,
        Handler: middleware.AddRequestID(middleware.AddLogger(logger.Log, co.Handler(mux))),
    }

    c := make(chan os.Signal, 1)
    signal.Notify(c, os.Interrupt)
    go func() {
        for range c {
        }

        _, cancel := context.WithTimeout(ctx, 5*time.Second)
        defer cancel()

        _ = srv.Shutdown(ctx)
    }()

    logger.Log.Info("starting HTTP/REST gateway...")
    return srv.ListenAndServe()
}
