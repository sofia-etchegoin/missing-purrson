import { useEffect, useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addNewUserApi, getAUserApi } from '../apis/api-users'
import { useAuth0 } from '@auth0/auth0-react'
import { NewUser, User } from '../../models/user'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import Nav from './Nav'

export default function RegisterUser() {
  const log = useAuth0()
  const navigate = useNavigate()

  const authUser = useAuth0().user
  //console.log(log.user)
  // TODO: replace placeholder user object with the one from auth0
  
  // this needs to be ASYNC
  const newUser = {
    authUser,
    nickname: authUser?.nickname,
    email: authUser?.email,
    auth0_id: authUser?.auth0_id,
    family_name: authUser?.family_name,
    given_name: authUser?.given_name,
  }
  const queryClient = useQueryClient()
  const [formFields, setformFields] = useState(newUser)
  //const [isFormVisible, setFormVisibility] = useState(false)
  const formData = new FormData()
  console.log()

  const addUserMutuation = useMutation({
    mutationFn: addNewUserApi,
    onSuccess: async () => {
      //const { catId } = data
      queryClient.invalidateQueries(['NewUser'])
      setformFields(newUser)
      navigate(`/missingcats`)
    },
  })

  

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // to be written
    //insert new user into DB
    formData.append('username', formFields.nickname)
    formData.append('email', formFields.email)
    formData.append('auth0_id', formFields.auth0_id)
    formData.append('given_name', formFields.given_name)
    formData.append('family_name', formFields.family_name)

    try {
      addUserMutuation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setformFields({
        ...formFields,
        [e.target.name]: e.target.value,
      })
      //console.log('file : ', file)
    }
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
                  value={formFields.nickname}
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
              <div className="cat-sightings-form__section">
                <label
                  className="cat-sightings-form-label"
                  htmlFor="description"
                >
                  Auth0_id
                </label>
                <textarea
                  className="cat-sightings-form-input"
                  id="auth0_id"
                  type="text"
                  cols="30"
                  rows="10"
                  name="auth0_id"
                  value={formFields.auth0_id}
                  onChange={handleInputChange}
                ></textarea>
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
                  value={formFields.given_name}
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
                  value={formFields.family_name}
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
            <button className="submit cat-sightings-form-btn" type="submit">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
