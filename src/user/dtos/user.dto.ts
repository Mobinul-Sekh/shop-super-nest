import { UserPriorityEnum, UserRoleEnum } from "../../auth/dtos/jwt-claim.dto";

export class UserDTO {
  uid: string;
  name: string
  phoneNo: string
  role: UserRoleEnum
  priority: UserPriorityEnum
  detailsId: string
  credentialId: string
}