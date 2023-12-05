// import { FormEvent } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
// //import { useAuthorisedRequest } from '../useAuthorisedRequest'

// export default function SignOut() {
//   const { logout, user : authUser } = useAuth0()
  
//   const user = {
//     authUser,
//     nickname: authUser?.name,
//     picture: authUser?.picture,
//   }

//   //const makeRequest = useAuthorisedRequest('get', '/api/v1/auth', undefined)

//   function OnSignOut(event: FormEvent<HTMLButtonElement>) {
//     event.preventDefault()
    
//     logout()

//   }


//   return (
//       <span>
//         <button onClick={OnSignOut}>Sign Out</button>
//          {user && <p>Signed in as: {user?.nickname} <img src={user?.picture} alt={user?.nickname}/></p>}
//       </span>
      
//   )
// }

// //   async function OnGetRequest() {
// //     const response = await (await makeRequest)()
// //     console.log(response)
// //   }
