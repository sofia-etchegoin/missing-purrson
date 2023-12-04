import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"

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
  // TODO: replace placeholder user object with the one from auth0
  const user = {
    authUser,
    nickname: authUser?.name,
    picture: authUser?.picture,
    email: authUser?.email,
    family_name: authUser?.family_name,
    given_name: authUser?.given_name,
  }

  const handleSignOut = () => {
    log.logout()
  }

  const handleSignIn = () => {
    //Is user currently registered
    //if sign/log in user 
    //else so register user 
    log.loginWithPopup()
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
              <button onClick={handleSignOut}>Sign out</button>
              {user && <p>Signed in as: {user?.nickname} <img src={user?.picture} alt={user?.nickname}/></p>}
            </IfAuthenticated>
            <IfNotAuthenticated>
              <button onClick={handleSignIn}>Sign in</button>
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
