import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JWTClaim, UserPriorityEnum, UserRoleEnum } from './dtos/jwt-claim.dto';
import * as bcrypt from 'bcrypt';
import { UserAddressService } from '../user-address/user-address.service';
import { UserDetailService } from '../user-details/user-details.service';
import { UserCredentialService } from '../user-credential/user-credential.service';
import { LoginDTO } from './dtos/login.dto';
import { UserStatusEnum } from '../schemas/user.schema';
import { UserDetailDocument } from 'src/schemas/user-details.schema';
import { UserCredentialDocument } from 'src/schemas/user-credentials.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
    private readonly userDetailService: UserDetailService,
    private readonly userCredentialService: UserCredentialService,
    private readonly jwtService: JwtService
  ) {}

  private async createHashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  private async createUserAddress(): Promise<any> {
    return await this.userAddressService.createUserAddress({
      houseNo: '',
      landmark: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
    });
  }

  private async createUserDetails(): Promise<UserDetailDocument> {
    return await this.userDetailService.createUserDetails({
      email: '',
      isPhoneVerified: false,
      isEmailVerified: false,
    });
  }

  private async createUserCredential(hashedPassword: string): Promise<UserCredentialDocument> {
    return await this.userCredentialService.createUserCredential({
      type: '',
      algo: '',
      digest: hashedPassword,
      encrypted: 'true',
    });
  }

  private async createJWTToken(user: any): Promise<string> {
    const tokenPayload: JWTClaim = {
      uid: user.id,
      userPhone: user.phoneNo,
      userName: user.name,
      role: user.role,
      priority: user.priority,
    };
    return this.jwtService.sign(tokenPayload);
  }

  async userSignup(userDto: SignupDTO): Promise<string> {
    if (userDto.password !== userDto.confirmPassword) {
      throw new BadRequestException('Password and confirm password do not match');
    }

    const hashedPassword = await this.createHashPassword(userDto.password);
    const details = await this.createUserDetails();
    const addresses = await this.createUserAddress();
    const credentials = await this.createUserCredential(hashedPassword);

    const createdUser = await this.userService.createUser({
      name: userDto.name,
      phoneNo: userDto.phoneNo,
      role: UserRoleEnum.customer,
      priority: UserPriorityEnum.normal,
      details: details,
      addresses: addresses,
      credentials: credentials
    });
    
    return this.createJWTToken(createdUser);
  }

  async userLogin(loginDto: LoginDTO): Promise<string> {
    const userExists = await this.userService.findUserByPhoneNo(loginDto.phoneNo);
    if (!userExists) {
      throw new BadRequestException('No user registered with this email. Please signup first.');
    }

    const credential = await this.userCredentialService.findCredentialById(userExists.credentials.toString());
    
    const validPassword = await bcrypt.compare(loginDto.password, credential.digest);
    if (!validPassword) {
      throw new BadRequestException('Invalid password!');
    }

    if (userExists.status !== UserStatusEnum.ACTIVE) {
      throw new BadRequestException('Your account is no longer available. Contact customer service.');
    }

    return this.createJWTToken(userExists);
  }
}
