import connection from './connection'
import { User, NewUser } from '../../models/user'

export async function getAUserDb(
  auth0_id: string,
  db = connection,
): Promise<User[]> {
  console.log(auth0_id)
  return await db('users')
    .select(
      'username',
      'password',
      'email',
      'auth0_id',
      'given_name', //: as givenName
      'family_name', // as familyName
    )
    .where('auth0_id', auth0_id)
    .first()
    .returning('*')
}

export async function addAUserDb(newUser: NewUser, db = connection) {
  try {
    await db('users').insert({
      username: newUser.username,
      email: newUser.email,
      auth0_id: newUser.auth0_id,
      given_name: newUser.givenName,
      family_name: newUser.familyName,
    })
  } catch (error) {
    console.error('Error in addUser:', error)
    throw error
  }
}
