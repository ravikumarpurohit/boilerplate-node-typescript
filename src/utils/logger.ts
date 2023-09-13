import winston from 'winston'

// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on 
// the current NODE_ENV: show all the log levels 
// if the server was run in development mode; otherwise, 
// if it was run in production, show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level. 
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Tell winston that you want to link the colors 
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  // Tell Winston that the logs must be colored
  // winston.format.colorize({ all: true }),
  winston.format.prettyPrint(),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf((info) => `${info.timestamp} ${info.level}:${info.message}`),
)

// Define which transports the logger must use to print out messages. 
// In this example, we are using three different transports 
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: 'error',
  // }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winston.transports.File({ filename: './logs/log-file.log' }),
]

// Create the logger instance that has to be exported 
// and used to log messages.
const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default Logger








// import { createLogger, transports, format } from "winston";
// const { combine, timestamp, prettyPrint, align, printf, errors } = format;
// // const basePath = "./logs/";
// const filePath = "./logs/log-file.log";

// const filter = (level) =>
//   format((info) => {
//     if (info.level === level) {
//       return info;
//     }
//   })();

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// const colors = {
//   error: 'red',
//   warn: 'yellow',
//   info: 'green',
//   http: 'magenta',
//   debug: 'white',
// }

// const dash = createLogger({
//   levels,
//   transports: [
//     new transports.File({
//       level: "error",
//       filename: filePath,
//       format: combine(
//         filter("error"),
//         errors({ stack: true }),
//         prettyPrint(),
//         timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
//         align(),
//         printf((info) => {
//           if (info.stack) {
//             return `${info.timestamp} ${info.level}:${info.message} \nStack:\n\t ${info.stack}`;
//           }
//           return `${info.timestamp} ${info.level}:${info.message}`;
//         })
//       )
//     }),
//     new transports.File({
//       level: "warn",
//       filename: filePath, //`${basePath}fatal.log`,
//       format: combine(
//         filter("warn"),
//         errors({ stack: true }),
//         prettyPrint(),
//         timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
//         align(),
//         printf((info) => {
//           if (info.stack) {
//             return `${info.timestamp} ${info.level}:${info.message} \nStack:\n\t ${info.stack}`;
//           }
//           return `${info.timestamp} ${info.level}: ${info.message}`;
//         }),
//         format.json()
//       )
//     }),
//     new transports.File({
//       level: "info",
//       filename: filePath, //`${basePath}info.log`,
//       format: combine(
//         filter("info"),
//         prettyPrint(),
//         timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
//         align(),
//         printf((info) => `${info.timestamp} ${info.level}:${info.message}`),
//       )
//     }),
//     new transports.File({
//       level: "debug",
//       filename: filePath, // `${basePath}debug.log`,
//       format: combine(
//         filter("debug"),
//         prettyPrint(),
//         timestamp({ format: "YYYY-MM-DD HH:mm:sss" }),
//         align(),
//         printf((info) => `${info.timestamp} ${info.level}:${info.message}`),
//         format.json()
//       )
//     }),
//     new transports.File({
//       filename: filePath, //`${basePath}http.log`,
//       level: "http",
//       format: format.combine(
//         filter("http"),
//         errors({ stack: true }),
//         prettyPrint(),
//         timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
//         align(),
//         printf((info) => {
//           if (info.stack) {
//             return `${info.timestamp} ${info.level}:${info.message} \nStack:\n\t ${info.stack}`;
//           }
//           return `${info.timestamp} ${info.level}: ${info.message}`;
//         })
//       )
//     }),
//   ],
// });

// dash.add(
//   new transports.Console({
//     format: format.combine(
//       errors({ stack: true }),
//       prettyPrint(),
//       timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
//       printf((info) => {
//         if (info.stack) {
//           return `${info.timestamp} ${info.level}:${info.message} \n ${info.stack}`;
//         }
//         return `${info.timestamp} ${info.level}: ${info.message}`;
//       }),
//     )
//   })
// );

// //#region Methods
// const info = (message: any, requestURL = null, extraPayload = null) => {
//   requestURL = requestURL ? ` RequestURL: ${requestURL}` : '';
//   extraPayload = extraPayload ? ` OtherDetails: ${extraPayload}` : '';
//   dash.info(`${message} ${requestURL} ${extraPayload}`);
// };
// const error = (error: any, requestURL = null, extraPayload = null) => {
//   requestURL = requestURL ? ` RequestURL: ${requestURL}` : '';
//   extraPayload = extraPayload ? ` OtherDetails: ${extraPayload}` : '';
//   dash.error(`${error} ${requestURL} ${extraPayload}`);
// };
// const warn = (error: any, requestURL = null, extraPayload = null) => {
//   requestURL = requestURL ? ` RequestURL: ${requestURL}` : '';
//   extraPayload = extraPayload ? ` OtherDetails: ${extraPayload}` : '';
//   dash.warn(`${error} ${requestURL}  ${extraPayload}`);
// };
// const http = (message: any, requestURL = null, extraPayload = null) => {
//   requestURL = requestURL ? ` RequestURL: ${requestURL}` : '';
//   extraPayload = extraPayload ? ` OtherDetails: ${extraPayload}` : '';
//   dash.http(`${message} ${requestURL}  ${extraPayload}`);
// };
// const debug = (extraPayload: any) => {
//   dash.debug(extraPayload);
// };
// export const logger = { info, error, warn, debug, http };