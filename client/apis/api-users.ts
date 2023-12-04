// 

import request from 'superagent'
import { User, NewUser } from '../../models/user'
const rootUrl = '/api/v1'

// ----- MISSING CATS ----- //

// GET a user (/api/v1/user/:Auth0_id)

export async function getAUserApi(Auth0_id: string): Promise<User> {
  try {
    const response = await request.get(`${rootUrl}/user/${Auth0_id}`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching individual user', error)
  }
}

export async function addNewUserApi(formData: NewUser): Promise<NewUser> {
  try {
    const response = await request
      .post(`${rootUrl}/user/adduser`)
      .send(formData)
    return response.body
  } catch (error) {
    throw console.error(`Error adding User `, error)
  }
}