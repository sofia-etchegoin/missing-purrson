import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addMissingCatApi } from '../apis/api-cats'
import { useParams, useNavigate } from 'react-router-dom'

const emptyCat = {
  catName: '',
  location: '',
  dateLost: '',
  color: '',
  breed: '',
  description: '',
  missingCatPhone: '',
  missingCatEmail: '',
  microchip: '',
  microChipNumber: '',
  missingImageUrl: '',
}

export default function AddMissingCat() {
  const { catId } = useParams<{ catId: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formFields, setFormFields] = useState(emptyCat)
  const formData = new FormData()
  const [file, setFile] = useState('')

  const addCatMutuation = useMutation({
    mutationFn: addMissingCatApi,
    onSuccess: async (data) => {
      const { catId } = data
      queryClient.invalidateQueries(['NewMissingCat'])
      setFormFields(emptyCat)
      navigate(`/missingcats/singlecat/${catId}`)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    formData.append('catName', formFields.catName)
    formData.append('location', formFields.location)
    formData.append('dateLost', formFields.dateLost)
    formData.append('color', formFields.color)
    formData.append('breed', formFields.breed)
    formData.append('description', formFields.description)
    formData.append('missingCatPhone', formFields.missingCatPhone)
    formData.append('missingCatEmail', formFields.missingCatEmail)
    formData.append('microchip', formFields.microchip)
    formData.append('microChipNumber', formFields.microChipNumber)
    formData.append('file', file)
    console.log(formFields.microChipNumber)
    // const formDataValues = formData.entries()
    // console.log(formDataValues[9] + ' - ' + formDataValues[10])
    try {
      addCatMutuation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.name === 'microchip') {
      setFormFields({
        ...formFields,
        microchip: e.target.value,
      })
    } else if (e.target.name === 'file') {
      //console.log("file : " , e.target.files[0].name)
      setFile(e.target.files[0])
      console.log('file : ', file)
    } else {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      })
    }
  }

  return (
    <>
      <div>
        <h1>Missing your kitty?</h1>
      </div>
      <form
        action="/addcat"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <h2>Fill out this form to get them listed!</h2>

        <label htmlFor="catName">NAME</label>
        <input
          id="catName"
          type="text"
          name="catName"
          value={formFields.catName}
          onChange={handleInputChange}
        />

        <label htmlFor="location">LOCATION</label>
        <input
          id="location"
          type="text"
          name="location"
          value={formFields.location}
          onChange={handleInputChange}
        />

        <label htmlFor="dateLost">DATE LOST</label>
        <input
          id="dateLost"
          type="date"
          name="dateLost"
          value={formFields.dateLost}
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

        <label htmlFor="breed">BREED</label>
        <input
          id="breed"
          type="text"
          name="breed"
          value={formFields.breed}
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

        <label htmlFor="missingCatEmail">EMAIL</label>
        <input
          id="missingCatEmail"
          type="text"
          name="missingCatEmail"
          value={formFields.missingCatEmail}
          onChange={handleInputChange}
        />

        <label htmlFor="missingCatPhone">PHONE</label>
        <input
          id="missingCatPhone"
          type="text"
          name="missingCatPhone"
          value={formFields.missingCatPhone}
          onChange={handleInputChange}
        />

        <label htmlFor="microchip">MICROCHIPPED?</label>
        <select
          id="microchip"
          name="microchip"
          value={formFields.microchip}
          onChange={handleInputChange}
        >
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>

        <label htmlFor="microChipNumber">MICROCHIP NO.</label>
        <input
          id="microChipNumber"
          type="text"
          name="microChipNumber"
          value={formFields.microChipNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="missingImageUrl">PHOTO</label>
        <input
          id="file"
          type="file"
          name="file"
          required
          onChange={handleInputChange}
        />
        <button type="submit" disabled={!file} className="add-cat">
          Submit
        </button>
      </form>
    </>
  )
}
