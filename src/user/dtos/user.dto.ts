import { UserPriorityEnum, UserRoleEnum } from "../../auth/dtos/jwt-claim.dto";
import { IsString, IsEnum, IsNotEmpty } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  phoneNo: string

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum

  @IsNotEmpty()
  @IsEnum(UserPriorityEnum)
  priority: UserPriorityEnum

  @IsNotEmpty()
  @IsString()
  detailsId: string

  @IsNotEmpty()
  @IsString()
  credentialId: string
}