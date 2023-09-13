import { Builder } from 'builder-pattern';
import { userEntity } from '../models/userModel'
import { Address, UpdateUserRequest } from '../models/requestModels/userRequest';

export const toUpdateUserMapper = (request: UpdateUserRequest, userData: userEntity) => {
  return Builder(UpdateUserRequest)
    .firstName(request.firstName ? request.firstName : userData.firstName)
    .lastName(request.lastName ? request.lastName : userData.lastName)
    .mobile(request.mobile ? request.mobile : userData.mobile)
    .address(request.address && toAddressMapper(request.address, userData.address))
    .status(request.status ? request.status : userData.status)
    .gender(request.gender ? request.gender : userData.gender)
    .build()
}

const toAddressMapper = (address: Address, userDataAddress: Address) => {
  return Builder(Address)
    .address1(address.address1 ? address.address1 : userDataAddress?.address1)
    .address2(address.address2 ? address.address2 : userDataAddress?.address2)
    .address3(address.address3 ? address.address3 : userDataAddress?.address3)
    .city(address.city ? address.city : userDataAddress?.city)
    .country(address.country ? address.country : userDataAddress?.country)
    .postcode(address.postcode ? address.postcode : userDataAddress?.postcode)
    .state(address.state ? address.state : userDataAddress?.state)
    .build()
}