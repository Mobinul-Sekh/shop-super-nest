import { UserPriorityEnum, UserRoleEnum } from "src/auth/dtos/jwt-claim.dto";

export class UserDTO {
  uid: string;
  name: string
  email: string
  isActive: boolean
  role: UserRoleEnum
  priority: UserPriorityEnum
  detailsId: string
  credentialId: string
}