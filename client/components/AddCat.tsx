import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addMissingCatApi } from '../apis/api-cats'

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
    console.log(formData)

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
        missingImageUrl: e.target.files[0],
      })
    } else if (e.target.name === 'microchipped') {
      setFormData({
        ...formData,
        microchip: e.target.value,
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

        <label htmlFor="catName">NAME</label>
        <input
          id="catName"
          type="text"
          name="catName"
          value={formData.catName}
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

        <label htmlFor="dateLost">DATE LOST</label>
        <input
          id="dateLost"
          type="date"
          name="dateLost"
          value={formData.dateLost}
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

        <label htmlFor="missingCatEmail">EMAIL</label>
        <input
          id="missingCatEmail"
          type="email"
          name="missingCatEmail"
          value={formData.missingCatEmail}
          onChange={handleInputChange}
        />

        <label htmlFor="missingCatPhone">PHONE</label>
        <input
          id="missingCatPhone"
          type="text"
          name="missingCatPhone"
          value={formData.missingCatPhone}
          onChange={handleInputChange}
        />

        <label htmlFor="microchipped">MICROCHIPPED?</label>
        <select
          id="microchipped"
          name="microchipped"
          value={formData.microchip}
          onChange={handleInputChange}
        >
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </select>

        <label htmlFor="microchipNumber">MICROCHIP NO.</label>
        <input
          id="microchipNumber"
          type="text"
          name="microchipNumber"
          value={formData.microChipNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="missingImageUrl">PHOTO</label>
        <input
          id="missingImageUrl"
          type="file"
          name="missingImageUrl"
          value={formData.missingImageUrl}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-cat">
          Submit
        </button>
      </form>
    </>
  )
}
