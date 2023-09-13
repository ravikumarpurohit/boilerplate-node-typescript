import { AddUserRequest } from "../controllers/requests/UserRequest";
// import { Service } from 'typedi';


export class UserServices {

  constructor() { }

  public async addUser(request: AddUserRequest): Promise<any> {
    console.log(request);
    try { } catch (e: any) { }
  }
}