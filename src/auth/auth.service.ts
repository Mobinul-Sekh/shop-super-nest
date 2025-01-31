import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDTO } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { v4 as uuid } from 'uuid';
import { JWTClaim, UserPriorityEnum, UserRoleEnum } from './dtos/jwt-claim.dto';
import * as bcrypt from 'bcrypt';
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

  private generateUUID() {
    return uuid();
  }

  private async createUserCredentials(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  private async createUser(userDto: SignupDTO): Promise<any> {
    const detailsId = this.generateUUID();
    const credentialId = this.generateUUID();

    return await this.userService.createUser({
      uid: this.generateUUID(),
      name: userDto.name,
      phoneNo: userDto.email,
      role: UserRoleEnum.customer,
      priority: UserPriorityEnum.normal,
      detailsId,
      credentialId,
    });
  }

  private async createUserAddress(): Promise<any> {
    const addressId = this.generateUUID();
    return await this.userAddressService.createUserAddress({
      id: addressId,
      houseNo: '',
      landmark: '',
      street: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
    });
  }

  private async createUserDetails(detailsId: string): Promise<void> {
    await this.userDetailService.createUserDetails({
      id: detailsId,
      email: '',
      isPhoneVerified: false,
      isEmailVerified: false,
    });
  }

  private async createUserCredential(credentialId: string, hashedPassword: string): Promise<void> {
    await this.userCredentialService.createUserCredential({
      id: credentialId,
      type: '',
      algo: '',
      digest: hashedPassword,
      encrypted: 'true',
    });
  }

  private async createJWTToken(user: any): Promise<string> {
    const tokenPayload: JWTClaim = {
      uid: user.uid,
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

    const hashedPassword = await this.createUserCredentials(userDto.password);
    const createdUser = await this.createUser(userDto);
    
    await this.createUserAddress();
    await this.createUserDetails(createdUser.detailsId);
    await this.createUserCredential(createdUser.credentialId, hashedPassword);

    return this.createJWTToken(createdUser);
  }

  async userLogin(loginDto: LoginDTO): Promise<string> {
    const userExists = await this.userService.findUserByEmail(loginDto.email);
    if (!userExists) {
      throw new BadRequestException('No user registered with this email. Please signup first.');
    }

    const credential = await this.userCredentialService.findCredentialById(userExists.credentialId);
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
