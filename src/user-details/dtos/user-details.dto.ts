import mongoose, { ObjectId } from "mongoose"

export class UserDetailsDTO {
  id: string
  phone: string
  isPhoneVerified: boolean
  isEmailVerified: boolean
  addressIds: string[]
}