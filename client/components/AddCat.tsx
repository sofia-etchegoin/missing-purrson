import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addMissingCatApi } from '../apis/api-cats'

const emptyCat = {
  cat_name: '',
  location: '',
  date_lost: '',
  color: '',
  breed: '',
  description: '',
  missing_cat_phone: '',
  missing_cat_email: '',
  microchipped: '',
  microchip_number: '',
  missing_image_url: '',
}

export default function AddCat() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState(emptyCat)

  const addCatMutuation = useMutation({
    mutationFn: addMissingCatApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['missing_cats'])
      setFormData(emptyCat)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      addCatMutuation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        missing_image_url: e.target.files[0],
      })
    } else if (e.target.name === 'microchipped') {
      setFormData({
        ...formData,
        microchipped: e.target.value,
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
        <h1>Missing your kitty?</h1>
      </div>
      <form
        action="/addcat"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <h2>Fill out this form to get them listed!</h2>

        <label htmlFor="cat_name">NAME</label>
        <input
          id="cat_name"
          type="text"
          name="cat_name"
          value={formData.cat_name}
          onChange={handleInputChange}
        />

        <label htmlFor="location">LOCATION</label>
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />

        <label htmlFor="date_lost">DATE LOST</label>
        <input
          id="date_lost"
          type="date"
          name="date_lost"
          value={formData.date_lost}
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

        <label htmlFor="breed">BREED</label>
        <input
          id="breed"
          type="text"
          name="breed"
          value={formData.breed}
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

        <label htmlFor="missing_cat_email">EMAIL</label>
        <input
          id="missing_cat_email"
          type="email"
          name="missing_cat_email"
          value={formData.missing_cat_email}
          onChange={handleInputChange}
        />

        <label htmlFor="missing_cat_phone">PHONE</label>
        <input
          id="missing_cat_phone"
          type="tel"
          name="missing_cat_phone"
          value={formData.missing_cat_phone}
          onChange={handleInputChange}
        />

        <label htmlFor="microchipped">MICROCHIPPED?</label>
        <select
          id="microchipped"
          name="microchipped"
          value={formData.microchipped}
          onChange={handleInputChange}
        >
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>

        <label htmlFor="microchip_number">MICROCHIP NO.</label>
        <input
          id="microchip_number"
          type="text"
          name="microchip_number"
          value={formData.missing_cat_phone}
          onChange={handleInputChange}
        />

        <label htmlFor="missing_image_url">PHOTO</label>
        <input
          id="missing_image_url"
          type="file"
          name="missing_image_url"
          value={formData.missing_image_url}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-cat">
          Submit
        </button>
      </form>
    </>
  )
}
