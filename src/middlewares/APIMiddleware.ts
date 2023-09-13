import { Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { error } from '../models/responseModels/responseModel';
import Logger from '../utils/logger';

export const apiMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return error("Token is expired. please login again.", StatusCodes.BAD_REQUEST, res, err);
      } else if (decoded) {
        console.log(decoded);
        req.user = decoded;
        next();
      } else {
        return error("Please login again.", StatusCodes.BAD_REQUEST, res);
      }
    });
  } else {
    return error("Token is require..", StatusCodes.BAD_REQUEST, res);
  }
};

export const adminMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return error("Token is expired. please login again.", StatusCodes.BAD_REQUEST, res, err);
      } else if (decoded) {
        console.log(decoded);
        req.user = decoded;
        if (req.user.role === "ADMIN") {
          next();
        } else {
          return error("Please login admin user.", StatusCodes.BAD_REQUEST, res);
        }
      } else {
        return error("Please login again.", StatusCodes.BAD_REQUEST, res);
      }
    });
  } else {
    return error("Token is require.", StatusCodes.BAD_REQUEST, res);
  }
};

export const userMiddleware = (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return error("Token is expired. please login again.", StatusCodes.BAD_REQUEST, res, err);
      } else if (decoded) {
        req.user = decoded;
        Logger.info(req.user);
        if (req.user._id === req.params._id || req.user.role === "ADMIN") {
          next();
        } else {
          return error("Please login authorized user.", StatusCodes.BAD_REQUEST, res, {});
        }
      } else {
        return error("Please login again.", StatusCodes.BAD_REQUEST, res, {});
      }
    });
  } else {
    return error("Token is require.", StatusCodes.BAD_REQUEST, res, {});
  }
};