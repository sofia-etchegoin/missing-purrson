//AddCatSighting.tsx

import { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addCatSightingApi, getCatSightingsApi } from '../apis/api-cats'
import { useParams } from 'react-router-dom'
import { SightedCat } from '../../models/cats'
import { Link } from 'react-router-dom'

const emptySighting = {
  location: '',
  dateSeen: '',
  color: '',
  description: '',
  sightedCatEmail: '',
  sightedCatPhone: '',
  sightedImgUrl: '',
}

export default function AddCatSightings() {
  const queryClient = useQueryClient()
  const [formFields, setformFields] = useState(emptySighting)
  const [isFormVisible, setFormVisibility] = useState(false)
  const formData = new FormData()
  const [file, setFile] = useState('')
  const { catIdMc } = useParams()

  const {
    data: catsighting,
    isLoading,
    isError,
  } = useQuery<SightedCat, Error>(['sighted_cats', catIdMc], () => {
    return getCatSightingsApi(Number(catIdMc))
  })

  const addCatSightingMutation = useMutation({
    mutationFn: (sightedCat) => addCatSightingApi(sightedCat, Number(catIdMc)),
    onSuccess: () => {
      queryClient.invalidateQueries(['sighted_cats'])
      setformFields(emptySighting)
      setFormVisibility(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    formData.append('location', formFields.location)
    formData.append('dateSeen', formFields.dateSeen)
    formData.append('color', formFields.color)
    formData.append('description', formFields.description)
    formData.append('sightedCatPhone', formFields.sightedCatPhone)
    formData.append('sightedCatEmail', formFields.sightedCatEmail)
    formData.append('file', file)
    try {
      addCatSightingMutation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat sighting')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setFile(e.target.files[0])
      console.log('file : ', file)
    } else {
      setformFields({
        ...formFields,
        [e.target.name]: e.target.value,
      })
    }
  }

  if (isError) {
    return <p>YEEEOOOWWWW! No kitties to be found!</p>
  }

  if (!catsighting || isLoading) {
    return <p>Loading...</p>
  }

  console.log(catsighting)

  return (
    <>
      <section className="cat-sightings">
        <div className="cat-sightings__left">
          <div className="cat-sightings__map"></div>
        </div>
        <div className="cat-sightings__right">
          <div className="cat-sightings__header">
            <h1 className="cat-sightings-heading">Possible Sightings</h1>
            <div className="cat-sightings__btn">
              <button
                className="cat-sightings-btn"
                onClick={() => setFormVisibility(!isFormVisible)}
              >
                {isFormVisible ? (
                  <>
                    <p> Hide Form</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <p>List a sighting</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </>
                )}
              </button>
              <Link to={`/missingcats/singlecat/${catIdMc}`}>
                <button>Back</button>
              </Link>
            </div>
          </div>
          {isFormVisible ? (
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
                        name="description"
                        value={formFields.description}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
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
          ) : (
            <div className="cat-sightings__cards">
              {catsighting.map((sighting) => (
                <div
                  key={sighting.sighted_cat_id}
                  className="cat-sightings-card"
                >
                  <div className="cat-sightings-card__top">
                    <div className="cat-sightings-card__img">
                      <img
                        src={'/' + sighting.sighted_image_url}
                        alt={sighting.name}
                        className="cat-sightings-card-img"
                      />
                    </div>
                    <div className="cat-sightings-card__info">
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Sighted:</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.date_seen}
                        </p>
                      </div>
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Location:</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.location}
                        </p>
                      </div>
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Colour</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.color}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cat-sightings-card__bottom">
                    <h3 className="cat-sightings-card-title">Description</h3>
                    <p className="cat-sightings-card-info">
                      {sighting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BREAK */}
    </>
  )
}
