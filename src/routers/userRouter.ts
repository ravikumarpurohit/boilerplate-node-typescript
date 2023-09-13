import { Router } from 'express';
import { signUp, getUser, updateUser, getUserList, logIn, profilePicUpload } from '../controllers/userController';
import { adminMiddleware, userMiddleware } from '../middlewares/APIMiddleware';
import { filesUpdate } from '../utils/filesUpdate';
const userRoute = Router();

userRoute.get('/list', adminMiddleware, getUserList);
userRoute.post('/', adminMiddleware, signUp);
userRoute.get('/:id', userMiddleware, getUser);
userRoute.patch('/:id', userMiddleware, updateUser);
userRoute.post('/login', logIn);
userRoute.post('/profile-upload/:id', userMiddleware, filesUpdate.array("files", 1), profilePicUpload);

export default userRoute;