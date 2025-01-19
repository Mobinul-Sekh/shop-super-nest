export enum UserRoleEnum {
  admin = "ADMIN",
  agent = "AGENT",
  customer = "CUSTOMER"
}

export enum UserPriorityEnum {
  normal = "NORMAL",
  plus = "PLUS"
}

export interface JWTClaim {
  uid: string
  role: UserRoleEnum
  userName: string
  userPhone: string
  priority: UserPriorityEnum
  phone?:string
  orgId?: string
  apiKeyId?: string
  orgName?: string
  claimType?: string
}