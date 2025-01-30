import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "../../schemas/user.schema";
import * as dotenv from 'dotenv';
import { JWTClaim } from "../dtos/jwt-claim.dto";

dotenv.config({ path: process.cwd() + '/.env.development' }); 

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel("user") private readonly userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET
    })
  }

  async validate(claim: JWTClaim): Promise<JWTClaim> {
    const user = await this.userModel.findOne({uid: claim.uid}).exec();
    console.log("user in auth ->", user);
    if (!user) return null;
    return claim;
  }
}