import { Request, Response } from 'express'
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { AddUserRequest, UpdateUserRequest, loginUserRequest } from '../models/requestModels/userRequest';
import Logger from '../utils/logger';
import { error, exception, success, successAuth } from '../models/responseModels/responseModel';
import { userEntity, userModel } from '../models/userModel'
import { checkPassword, encryptPassword } from '../utils/checkPassword'
import { toUpdateUserMapper } from '../mapper/userMapper';
import config from '../config/indexConfig';

export const signUp = async (req: Request, res: Response) => {
  try {
    const validateError = await validate(Object.assign(new AddUserRequest(), req.body));
    if (validateError.length > 0) {
      return error("Request data is not validate.", StatusCodes.BAD_REQUEST, res, validateError);
    }
    const request: AddUserRequest = req.body;
    const userData = await userModel.findOne({ email: request.email })
    if (userData) {
      return error("Email Id is already existing.", StatusCodes.BAD_REQUEST, res, userData);
    }
    Logger.info(`signUp request - ${JSON.stringify(request)}`);
    const password = await encryptPassword(request.password);
    request.password = password;
    Logger.info(`updated data request - ${JSON.stringify(request)}`);
    const result = await userModel.create(request);
    if (result) {
      return success("User is created.", '', StatusCodes.CREATED, res);
    } else {
      return error("Error while creating user.", StatusCodes.INTERNAL_SERVER_ERROR, res, result);
    }
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const validateError = await validate(Object.assign(new UpdateUserRequest(), req.body));
    if (validateError.length > 0) {
      return error("Request data is not validate.", StatusCodes.BAD_REQUEST, res, validateError);
    }
    const existUserData: userEntity = await userModel.findById(_id);
    if (!existUserData) {
      return error("Not found user.", StatusCodes.NOT_FOUND, res, existUserData);
    }
    const request: UpdateUserRequest = req.body;
    const newUserData = toUpdateUserMapper(request, existUserData);
    const result = await userModel.updateOne(newUserData);
    if (result) {
      return success("User is updated.", '', StatusCodes.ACCEPTED, res);
    } else {
      return error("Error while updating user.", StatusCodes.INTERNAL_SERVER_ERROR, res, result);
    }
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const existUserData: userEntity = await userModel.findById(_id);
    if (!existUserData) {
      return error("Not found user.", StatusCodes.NOT_FOUND, res, existUserData);
    }
    return success("User data", existUserData, StatusCodes.OK, res);
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
}

export const getUserList = async (req: Request, res: Response) => {
  try {
    const result = await userModel.find({}, "_id firstName lastName gender address email  status role");
    return success("User list", result, StatusCodes.OK, res);
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
}

export const logIn = async (req: Request, res: Response) => {
  try {
    const validateError = await validate(Object.assign(new loginUserRequest(), req.body));
    if (validateError.length > 0) {
      return error("Request data is not validate.", StatusCodes.BAD_REQUEST, res, validateError);
    }
    const request: loginUserRequest = req.body;
    const user = await userModel.findOne({
      email: { $regex: new RegExp(`^${request.email}$`, "i") }
    },
      "_id email firstName lastName password status role"
    ).lean();
    if (!user) {
      return error("Email Id is not found.", StatusCodes.BAD_REQUEST, res);
    }
    if (!user.status) {
      return error("Email Id is not active.", StatusCodes.BAD_REQUEST, res);
    }
    const isPassword = await checkPassword(request.password, user.password);
    if (isPassword) {
      const { password, ..._user } = user;
      const _token = jwt.sign({ _id: _user._id, role: _user.role }, config.jwtSecret, {
        expiresIn: "4h",
      });
      const cookieOptions = process.env.NODE_ENV === "development"
        ? {
          httpOnly: true,
          secure: true,
        }
        : {
          httpOnly: true,
          secure: true,
        };
      res.cookie("_token", _token, cookieOptions);
      return successAuth("", _token, _user, StatusCodes.OK, res, 5);
    } else {
      return error("The password does not match.", StatusCodes.INTERNAL_SERVER_ERROR, res);
    }
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
};

export const profilePicUpload = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const existUserData: userEntity = await userModel.findById(_id);
    if (!existUserData) {
      return error("Not found user.", StatusCodes.NOT_FOUND, res, existUserData);
    }
    existUserData.profileImage = req.files[0].filename;
    const result = await userModel.updateOne(existUserData);
    if (result) {
      return success("User is updated.", '', StatusCodes.ACCEPTED, res);
    } else {
      return error("Error while updating user.", StatusCodes.INTERNAL_SERVER_ERROR, res, result);
    }
  } catch (error) {
    return exception("", StatusCodes.INTERNAL_SERVER_ERROR, res, error);
  }
}