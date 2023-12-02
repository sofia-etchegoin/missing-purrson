//AddCatSighting.tsx

import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
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
  const [formData, setFormData] = useState(emptySighting)
  const [isFormVisible, setFormVisibility] = useState(false)
  const { catIdMc } = useParams()

  const addCatSightingMutation = useMutation({
    mutationFn: (sightedCat) => addCatSightingApi(sightedCat, Number(catIdMc)),
    onSuccess: () => {
      queryClient.invalidateQueries(['sighted_cats'])
      setFormData(emptySighting)
      setFormVisibility(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      addCatSightingMutation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat sighting')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        sightedImgUrl: e.target.files[0],
      })
    } else {
      setFormData({
        ...formData,
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
            value={formData.location}
            onChange={handleInputChange}
          />
          <label htmlFor="dateSeen">DATE</label>
          <input
            id="dateSeen"
            type="date"
            name="dateSeen"
            value={formData.dateSeen}
            onChange={handleInputChange}
          />
          <label htmlFor="color">COLOR</label>
          <input
            id="color"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
          <label htmlFor="description">DESCRIPTION</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedCatEmail">EMAIL</label>
          <input
            id="sightedCatEmail"
            type="text"
            name="sightedCatEmail"
            value={formData.sightedCatEmail}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedCatPhone">PHONE</label>
          <input
            id="sightedCatPhone"
            type="text"
            name="sightedCatPhone"
            value={formData.sightedCatPhone}
            onChange={handleInputChange}
          />
          <label htmlFor="sightedImgUrl">PHOTO</label>
          <input
            id="sightedImgUrl"
            type="file"
            name="sightedImgUrl"
            value={formData.sightedImgUrl}
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
