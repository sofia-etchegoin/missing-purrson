import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { Link } from 'react-router-dom'
import { getAUserApi } from '../apis/api-users'
import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from 'react-router-dom'
import RegisterUser from './RegisterUser.tsx'

interface NavColor {
  backgroundColour: string
  itemColour: string
  borderColour: string
}

export default function Nav({
  backgroundColour,
  itemColour,
  borderColour,
}: NavColor) {
  const navStyle = {
    background: backgroundColour,
  }

  const navItemStyle = {
    color: itemColour,
  }

  const navBorderStyle = {
    borderColor: borderColour,
  }
  const log = useAuth0()
  const authUser = useAuth0().user
  const navigate = useNavigate()
  const userLogged = {
    authUser,
    nickname: authUser?.name,
    picture: authUser?.picture,
    auth0Id: authUser?.sub,
    email: authUser?.email,
    family_name: authUser?.family_name,
    given_name: authUser?.given_name,
  }
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['user', userLogged.auth0Id],
    queryFn: async () => {
      try {
        const userData = await getAUserApi(userLogged.auth0Id)
        return userData // Return the data
      } catch (error) {
        throw new Error('Failed to fetch user data') // Throw an error if there's an issue
      }
    },
  })

  if (isError) {
    console.log("you need to register")
  }
    //     // //}, [isError, navigate])
  if (isLoading) {
    return <p>Hang in there Kitty.</p>
  }
  if (user) {
    navigate('/')
  }
  if(!user){
    navigate('/registeruser')
  }
  // TODO: replace placeholder user object with the one from auth0
  

  const handleSignOut = () => {
    log.logout()
  }

  const handleSignIn = () => {
    //Is user currently registered
    //if sign/log in user 
    //else so register user 
    log.loginWithRedirect()
    navigate(<RegisterUser user={userLogged}/>)
    //console.log('component ', currentUser)
    //UseQuery to establish if user exists
    

  }
  return (
    <header>
      <nav className="nav" style={navStyle}>
        <div className="nav__left">
          <div className="nav__logo">
            <img
              src="/client/images/MP-Logo-White.svg"
              alt="Missing Purrson Logo"
              className="nav-logo"
            />
          </div>
        </div>
        <div className="nav__right">
          <div className="nav__links">
            <Link className="nav-link" style={navItemStyle} to={'/'}>
              HOME
            </Link>
            <Link className="nav-link" style={navItemStyle} to={'/missingcats'}>
              CATS
            </Link>
          </div>
          <div style={navBorderStyle} className="nav-div"></div>
          <div className="nav__links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
        <IfAuthenticated>
          <Link to='/' onClick={handleSignOut}>Sign out</Link>
          {userLogged && <p>Signed in as: {userLogged?.nickname} <img src={userLogged?.picture} alt={userLogged?.nickname}/></p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to='/'onClick={handleSignIn}>Sign in</Link>
        </IfNotAuthenticated>

          </div>
        </div>
      </nav>
    </header>
  )
}

            
{/* <a href="#" id="login" style={navItemStyle} className="nav-auth">
LOGIN
</a>
<a href="#" id="signUp" style={navItemStyle} className="nav-auth">
SIGNUP
</a> */}