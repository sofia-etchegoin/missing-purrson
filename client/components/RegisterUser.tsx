import { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addNewUserApi, getAUserApi } from '../apis/api-users'
import { useAuth0 } from '@auth0/auth0-react'
import { NewUser, User } from '../../models/user'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import Nav from './Nav'

export default function RegisterUser() {
  const navigate = useNavigate()
  const authUser = useAuth0().user
  const newUser = {
    authUser,
    username: authUser?.nickname,
    email: authUser?.email,
    auth0Id: authUser?.sub,
    familyName: authUser?.family_name,
    givenName: authUser?.given_name,
  }
  const addUserMutuation = useMutation({
    mutationFn: addNewUserApi,
    onSuccess: async () => {
      //const { catId } = data
      queryClient.invalidateQueries(['NewUser'])
      setformFields(newUser)
      navigate(`/missingcats`)
    },
  })
  const queryClient = useQueryClient()
  const [formFields, setformFields] = useState(newUser)

  const authIsLoading = useAuth0().isLoading

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['user', authUser.auth0Id],
    queryFn: async () => {
      try {
        const userData = await getAUserApi(authUser.auth0Id)
        return userData // Return the data
      } catch (error) {
        throw new Error('Failed to fetch user data') // Throw an error if there's an issue
      }
    },
    // onSuccess: (userData) => {
    //   // Navigate based on the presence of user data
    //   if (userData) {
    //     navigate('/');
    //   }
    // },
  })

  if (user) {
    navigate('/')
  }
  if (isError) {
    navigate('/registeruser')
  }
  //     // //}, [isError, navigate])
  if (isLoading) {
    return <p>Hang in there Kitty.</p>
  }
  if (authIsLoading) {
    return <p>authIsLoading</p>
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setTimeout('1500')
      addUserMutuation.mutate(formFields)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    //if (e.target.type === 'file') {
    setformFields({
      ...formFields,
      [e.target.name]: e.target.value,
    })
    //console.log('file : ', file)
    //}
  }

  return (
    <>
      <div className="cat-sightings__form">
        <div className="cat-sightings-form__header">
          <h2 className="cat-sightings-form-heading">
            Register with MissingPurrson
          </h2>
        </div>
        <form
          className="cat-sightings-form"
          action="/sightings:id"
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="cat-sightings-form__content">
            <div className="cat-sightings-form__left">
              <div className="cat-sightings-form__section">
                <label className="cat-sightings-form-label" htmlFor="location">
                  Username
                </label>
                <input
                  className="cat-sightings-form-input"
                  id="username"
                  type="text"
                  name="username"
                  value={formFields.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="cat-sightings-form__section">
                <label className="cat-sightings-form-label" htmlFor="color">
                  Email
                </label>
                <input
                  className="cat-sightings-form-input"
                  id="email"
                  type="text"
                  name="email"
                  value={formFields.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="cat-sightings-form__right">
              <div className="cat-sightings-form__section">
                <label
                  className="cat-sightings-form-label"
                  htmlFor="sightedCatEmail"
                >
                  given name
                </label>
                <input
                  className="cat-sightings-form-input"
                  id="given_name"
                  type="text"
                  name="given_name"
                  value={formFields.givenName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="cat-sightings-form__section">
                <label
                  className="cat-sightings-form-label"
                  htmlFor="sightedCatPhone"
                >
                  family name
                </label>
                <input
                  className="cat-sightings-form-input"
                  id="family_name"
                  type="text"
                  name="family_name"
                  value={formFields.familyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="cat-sightings-form__section">
                <h3 className="cat-sightings-form-label">PRIVACY</h3>
                <h4 className="cat-sightings-form-privacy">
                  Completing Registration. Terms and Conditions Apply, Meow!
                </h4>
              </div>
            </div>
          </div>
          <div className="cat-sightings-form__btn">
            <button className="submit cat-sightings-form-btn" type="submit">
              Register
            </button>
            <Link to="/">
              <button className="submit cat-sightings-form-btn" type="submit">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
