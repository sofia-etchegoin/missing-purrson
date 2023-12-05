export interface NewUser {
  username: string
  password: string
  email: string
  auth0_id: string
  givenName: string
  familyName: string
}

export interface User {
  userId: number
  username: string | Blob
  password: string
  email: string
  auth0Id: string
  givenName: string
  familyName: string
}