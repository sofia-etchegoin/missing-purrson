//AddCatSighting.tsx

import { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addCatSightingApi } from '../apis/api-cats'
import { useParams } from 'react-router-dom'

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
    formData.append('dateLost', formFields.dateSeen)
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

  return (
    <>
      <div>
        <h1>Possible sightings</h1>
      </div>

      {isFormVisible && (
        <form
          action="/sightings:id"
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <h2>List a Sighting</h2>
          <label htmlFor="location">LOCATION</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formFields.location}
            onChange={handleInputChange}
          />
          <label htmlFor="dateSeen">DATE</label>
          <input
            id="dateSeen"
            type="date"
            name="dateSeen"
            value={formFields.dateSeen}
            onChange={handleInputChange}
          />
          <label htmlFor="color">COLOR</label>
          <input
            id="color"
            type="text"
            name="color"
            value={formFields.color}
            onChange={handleInputChange}
          />
          <label htmlFor="description">DESCRIPTION</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formFields.description}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedCatEmail">EMAIL</label>
          <input
            id="sightedCatEmail"
            type="text"
            name="sightedCatEmail"
            value={formFields.sightedCatEmail}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedCatPhone">PHONE</label>
          <input
            id="sightedCatPhone"
            type="text"
            name="sightedCatPhone"
            value={formFields.sightedCatPhone}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedImgUrl">PHOTO</label>
          <input
            id="file"
            type="file"
            name="file"
            required
            onChange={handleInputChange}
          />
          <h3>PRIVACY</h3> <br />
          <h4>
            Completing a listing will make your contact details visible. For
            more privacy, you only need to list the street or suburb the animal
            was seen - not an exact address.
          </h4>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      )}
      <button onClick={() => setFormVisibility(!isFormVisible)}>
        {isFormVisible ? 'Back' : 'List a sighting'}
      </button>
    </>
  )
}
