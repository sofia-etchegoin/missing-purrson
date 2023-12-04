//AddCatSighting.tsx

import { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addCatSightingApi, getCatSightingsApi } from '../apis/api-cats'
import { useParams } from 'react-router-dom'
import { SightedCat } from '../../models/cats'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const emptyUser = {
  username: '',
  password: '',
  email: '',
  auth0_id: '',
  given_name: '',
  family_name: '',
}

export default function AddCatSightings() {
  const queryClient = useQueryClient()
  const [formFields, setformFields] = useState(emptyUser)
  //const [isFormVisible, setFormVisibility] = useState(false)
  const formData = new FormData()
  const [file, setFile] = useState('')
  const { catIdMc } = useParams()

  function onHandleSubmit(){

  }

  function onHandleChange(){

  }

  return (
    <>
    <div className="cat-sightings__form">
              <div className="cat-sightings-form__header">
                <h2 className="cat-sightings-form-heading">List a Sighting</h2>
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
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="location"
                      >
                        LOCATION
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="location"
                        type="text"
                        name="location"
                        value={formFields.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="dateSeen"
                      >
                        DATE
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="dateSeen"
                        type="date"
                        name="dateSeen"
                        value={formFields.dateSeen}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="color"
                      >
                        COLOR
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="color"
                        type="text"
                        name="color"
                        value={formFields.color}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="description"
                      >
                        DESCRIPTION
                      </label>
                      <textarea
                        className="cat-sightings-form-input"
                        id="description"
                        type="text"
                        cols="30"
                        rows="10"
                        name="description"
                        value={formFields.description}
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
                        EMAIL
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="sightedCatEmail"
                        type="text"
                        name="sightedCatEmail"
                        value={formFields.sightedCatEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="sightedCatPhone"
                      >
                        PHONE
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="sightedCatPhone"
                        type="text"
                        name="sightedCatPhone"
                        value={formFields.sightedCatPhone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="sightedImgUrl"
                      >
                        PHOTO
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="file"
                        type="file"
                        name="file"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <h3 className="cat-sightings-form-label">PRIVACY</h3>
                      <h4 className="cat-sightings-form-privacy">
                        Completing a listing will make your contact details
                        visible. For more privacy, you only need to list the
                        street or suburb the animal was seen - not an exact
                        address.
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="cat-sightings-form__btn">
                  <button
                    className="submit cat-sightings-form-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
    </>
  )
}