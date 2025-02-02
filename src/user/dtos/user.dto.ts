import { Type } from "class-transformer";
import { UserPriorityEnum, UserRoleEnum } from "../../auth/dtos/jwt-claim.dto";
import { IsString, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { UserDetailsDTO } from "src/user-details/dtos/user-details.dto";
import { UserCredentialDTO } from "src/user-credential/dtos/user-credential.dto";
import { UserAddressDTO } from "src/user-address/dtos/user-address.dto";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsString()
  readonly phoneNo: string

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  readonly role: UserRoleEnum

  @IsNotEmpty()
  @IsEnum(UserPriorityEnum)
  readonly priority: UserPriorityEnum

  @ValidateNested()
  @Type(() => UserDetailsDTO)
  readonly details: UserDetailsDTO

  @ValidateNested()
  @Type(() => UserCredentialDTO)
  readonly credentials: UserCredentialDTO

  @ValidateNested()
  @Type(() => UserAddressDTO)
  readonly addresses: UserAddressDTO
}