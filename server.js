require("@babel/register");
const dotenv = require("dotenv");
const app = require("./app");

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION!");
  console.log(error, JSON.stringify(error.stack));
  process.exit(1);
});

// Express server and port for all incoming requests
const setUpExpress = () => {
  dotenv.config({ path: ".env" });

  const port = process.env.APP_PORT || 3000;

  const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });

  // In case of an error
  app.on("error", (appErr, appCtx) => {
    console.error("App error", appErr.stack);
    console.error("on url", appCtx.req.url);
    console.error("with headers", appCtx.req.headers);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION!");
    console.log(err.name, err.message);
    // Close server & exit process
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    console.log("Signal to Terminate Received! Shutting down!");
    server.close(() => {
      console.log("Process terminated!");
    });
  });
};

setUpExpress();
