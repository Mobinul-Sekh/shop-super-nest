import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { v4 as uuid } from 'uuid';
import { JWTClaim, UserPriorityEnum, UserRoleEnum } from './dtos/jwt-claim.dto';
import * as bcrypt from "bcrypt"
import { UserAddressService } from '../user-address/user-address.service';
import { UserDetailService } from '../user-details/user-details.service';
import { UserCredentialService } from '../user-credential/user-credential.service';
import { LoginDTO } from './dtos/login.dto';
import { UserStatusEnum } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
    private readonly userDetailService: UserDetailService,
    private readonly userCredentialService: UserCredentialService,
    private readonly jwtService: JwtService
  ) {}

  async userSignup(userDto: SignupDTO): Promise<string> {
    if (userDto.password !== userDto.confirmPassword) {
      throw new BadRequestException('password and confirm password does not match');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    
    const detailsId = uuid();
    const credentialId = uuid();
    const createdUser = await this.userService.createUser({
      uid: uuid(),
      name: userDto.name,
      phoneNo: userDto.email,
      role: UserRoleEnum.customer,
      priority: UserPriorityEnum.normal,
      detailsId: detailsId,
      credentialId: credentialId
    });

    const addressId = uuid();
    const addressCreated = await this.userAddressService.createUserAddress({
      id: addressId,
      houseNo: "",
      landmark: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pinCode: ""
    })

    await this.userDetailService.createUserAddress({
      id: createdUser.detailsId,
      phone: "",
      isPhoneVerified: false,
      isEmailVerified: false,
      addressIds: [addressCreated.id]
    })

    await this.userCredentialService.createUserCredential({
      id: createdUser.credentialId,
      type: "",
      algo: "",
      digest: hashedPassword,
      encrypted: "true"
    })

    
    return this._createToken({
      uid: createdUser.uid,
      userPhone: createdUser.phoneNo,
      userName: createdUser.name,
      role: createdUser.role,
      priority: createdUser.priority
    })
  }

  async userLogin(loginDto: LoginDTO): Promise<string> {
    const userExists = await this.userService.findUserByEmail(loginDto.email);
    if (!userExists) {
      throw new BadRequestException(`no user registered with this email, please signup first.`)
    }

    const credential = await this.userCredentialService.findCredentialById(userExists.credentialId);
    const validPassword = bcrypt.compare(credential.digest, loginDto.password);
    if (!validPassword) {
      throw new BadRequestException(`invalid password!`)
    }

    if (userExists.status !== UserStatusEnum.ACTIVE) {
      throw new BadRequestException(`your account is no longer available!, contract to customer service`)
    }

    return this._createToken({
      uid: userExists.uid,
      userPhone: userExists.phoneNo,
      userName: userExists.name,
      role: userExists.role,
      priority: userExists.priority
    })
  }

  private _createToken(tokenPayload: JWTClaim) {
    return this.jwtService.sign(tokenPayload);
  }
}
