import { Router } from 'express';
import userRoute from './userRouter';
const api = Router();

api.use("/user", userRoute);

export default api;