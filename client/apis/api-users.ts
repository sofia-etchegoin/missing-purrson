//

import request from 'superagent'
import { User, NewUser } from '../../models/user'
const rootUrl = '/api/v1'

// ----- MISSING CATS ----- //

// GET a user (/api/v1/user/:Auth0Id)

export async function getAUserApi(Auth0Id: string): Promise<User> {
  //console.log('API Client', Auth0Id)
  try {
    const response = await request.get(`${rootUrl}/user/${Auth0Id}`)
    //console.log('Response API client', response.body)
    return response.body
  } catch (error) {
    throw console.error('Error fetching individual user', error)
  }
}

export async function addNewUserApi(formData: NewUser): Promise<NewUser> {
  //console.log(formData)
  try {
    const response = await request
      .post(`${rootUrl}/user/adduser`)
      .send(formData)
    return response.body
  } catch (error) {
    throw console.error(`Error adding User `, error)
  }
}
