import { FormEvent } from 'react'
import { IfNotAuthenticated } from './IsAuthenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { getAUserApi } from '../apis/api-users'
import { useQuery } from '@tanstack/react-query'
import { NewUser, User } from '../../models/user'
import { useEffect } from 'react'

export default function SignIn() {

  const { loginWithRedirect } = useAuth0()

  function OnSignIn(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    loginWithRedirect()

    console.log('Sign in Component')
  }
  const authUser = useAuth0().user
  const { isLoading: authLoading } = useAuth0()
  // this needs to be ASYNC
  const currentUser = authUser?.sub
  console.log('component ', currentUser)
  // UseQuery to establish if user exists
  // const {
  //   data: user,
  //   isError,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['user', currentUser],
  //   queryFn: async () => {
  //     try {
  //       const userData = await getAUserApi(currentUser)
  //       return userData // Return the data
  //     } catch (error) {
  //       throw new Error('Failed to fetch user data') // Throw an error if there's an issue
  //     }
  //   },
  // })
  //useEffect(() => {
    if (isError) {
      navigate('/registeruser')
    }
    //}, [isError, navigate])
    if (!user || isLoading) {
      return <p>Hang in there Kitty.</p>
    }
    if (authLoading) {
      return <p>AuthLoading</p>
    }
    if (user) {
      navigate('/addcat')
    }

  return (
    <IfNotAuthenticated>
      <span>
        <a onClick={OnSignIn}>Sign In</a>
      </span>
    </IfNotAuthenticated>
  )
}
