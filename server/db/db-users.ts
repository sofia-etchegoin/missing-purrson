import connection from './connection'
import { User, NewUser } from '../../models/user'

export async function getAUserDb(
  auth0_id: string,
  db = connection,
): Promise<User[]> {
  return await db('users')
    .select(
      'username',
      'password',
      'email',
      'auth0_id as auth0Id',
      'given_name', //: as givenName
      'family_name', // as familyName
    )
    .where('auth0_id', auth0_id)
    .first()
    .returning('*')
}

export async function addAUserDb(newUser: NewUser, db = connection) {
  try {
    const addedUser = await db('users').insert({
      username: newUser.username,
      email: newUser.email,
      auth0_id: newUser.auth0Id,
      given_name: newUser.givenName,
      family_name: newUser.familyName,
    })
    return addedUser
  } catch (error) {
    console.error('Error in addUser:', error)
    throw error
  }
}
