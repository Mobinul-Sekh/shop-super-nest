import mongoose, { ObjectId } from "mongoose"

export class UserDetailsDTO {
  id: string
  email: string
  isPhoneVerified: boolean
  isEmailVerified: boolean
}