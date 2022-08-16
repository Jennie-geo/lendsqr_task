//import app from '../dist/app';
import app from "./app";
import debug from "debug";
import mysql from "mysql";
import http from "http";
import dotenv from "dotenv";
import knex from "knex";
dotenv.config();
/**
 * Get port from environment and store in Express.
 */
debug("setnodetypescript:server");

const port = normalizePort(process.env.PORT || "3004");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Creating the communication channel.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("jenny connect on port", port);
/**
 * Normalize a port into a number, string, or false.
 */
// mysql
//   .createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'assessment',
//   })
//   .connect(function (err) {
//     if (err) {
//       return console.error('error: ' + err.message);
//     }
//     console.log('Connected to the MySQL server Successful.');
//   });

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log("Listening on " + bind);
}
