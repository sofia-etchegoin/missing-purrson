// import { FormEvent } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
// import { getAUserApi } from '../apis/api-users'
// //import { useQuery } from '@tanstack/react-query'
// //import { NewUser, User } from '../../models/user'
// //import { useEffect } from 'react'


// export default function SignIn() {

//   //const { user: authUser } = useAuth0()
//   const log = useAuth0()
//   const handleSignIn = () => { 
//     //const log = useAuth0()
//     //event.preventDefault()
    
//     log.loginWithPopup()

//     //console.log('Sign in Component')
  
//     // TODO: replace placeholder user object with the one from auth0
//   //   const user = {
//   //     authUser,
//   //     nickname: authUser?.name,
//   //     picture: authUser?.picture,
//   //     email: authUser?.email,
//   //     family_name: authUser?.family_name,
//   //     given_name: authUser?.given_name,
//   //   }
//   }

//   return (
//       <span>
//       <button onClick={handleSignIn}>Sign in</button>
//       </span>
//   )
// }

//  // const authUser = useAuth0().user
//   // const { isLoading: authLoading } = useAuth0()
//   // // this needs to be ASYNC
//   // const currentUser = authUser?.sub
//   // console.log('component ', currentUser)
//   // UseQuery to establish if user exists
//   // const {
//   //   data: user,
//   //   isError,
//   //   isLoading,
//   // } = useQuery({
//   //   queryKey: ['user', currentUser],
//   //   queryFn: async () => {
//   //     try {
//   //       const userData = await getAUserApi(currentUser)
//   //       return userData // Return the data
//   //     } catch (error) {
//   //       throw new Error('Failed to fetch user data') // Throw an error if there's an issue
//   //     }
//   //   },
//   // })
  
//   //useEffect(() => {
//     // if (isError) {
//     //   navigate('/registeruser')
//     // }
//     // //}, [isError, navigate])
//     // if (!user || isLoading) {
//     //   return <p>Hang in there Kitty.</p>
//     // }
//     // if (authLoading) {
//     //   return <p>AuthLoading</p>
//     // }
//     // if (user) {
//     //   navigate('/addcat')
//     // }
//     //}