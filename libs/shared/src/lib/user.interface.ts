export type UserType = 'DENTIST' | 'PATIENT';

export interface User {
  id: number,
  accountId?: number,
  type: UserType,
  firstname: string,
  lastname: string,
  email?: string,
  street?: string,
  streetNb?: string,
  city?: string,
  postalCode?: string,
  country?: string,
  phoneNumber?: string,
  lastLogin?: Date,
  image?: any,
  createdOn: Date
}