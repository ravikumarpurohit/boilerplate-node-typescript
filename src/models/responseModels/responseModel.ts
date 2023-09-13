import { randomUUID } from 'crypto';
import Logger from '../../utils/logger';

/*
Code:
0 = Error
5 = Success
6 = Logout
*/

/**
 * 
 * @param {string} message 
 * @param {array} results 
 * @param {number} statusCode 
 * @param {object} responseObj
 * @param {number} code
 */
export const success = (message, results, statusCode, responseObj, code = null) => {
  return responseObj.status(statusCode).json({
    data: results,
    error: false,
    message: message,
    code: code,
  });
};

/**
 * 
 * @param {string} message 
 * @param {array} results 
 * @param {number} statusCode 
 * @param {object} responseObj
 * @param {number} code
 */
export const successAuth = (message, token, results, statusCode, responseObj, code = null) => {
  return responseObj.status(statusCode).json({
    data: results,
    _token: token,
    error: false,
    message: message,
    code: code,
  });
};

/**
* 
* @param {string} message 
* @param {number} statusCode 
* @param {object} responseObj
* @param {object} err
*/
export const error = (message, statusCode, responseObj, err: any = null) => {
  if (err) Logger.error(message, responseObj.req.originalUrl, JSON.stringify(err));

  return responseObj.status(statusCode).json({
    error: true,
    message: message,
    details: err,
    code: 0
  });
};

/**
 * 
 * @param {string} message 
 * @param {object} responseObj
 * @param {number} statusCode 
 * @param {object} errorData 
 */
export const exception = (message, statusCode, responseObj, errorData) => {
  message = message == "" ? errorData.message : message;
  let uniqueId = randomUUID();
  Logger.error(`${message} uniqueId - ${uniqueId}`, responseObj.req.originalUrl, JSON.stringify(errorData))
  return responseObj.status(statusCode).json({
    error: true,
    message: message,
    details: `Please contact support team.\n Error-Reference-Id: ${uniqueId} | Error ${JSON.stringify(errorData)}`,
    code: 0,
  });
};