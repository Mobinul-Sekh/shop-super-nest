import mongoose, { ObjectId } from "mongoose"

export class UserDetailsDTO {
  email: string
  isPhoneVerified: boolean
  isEmailVerified: boolean
}