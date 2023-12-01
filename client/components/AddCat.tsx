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
  //missingImageUrl: '',
}

export default function AddCat() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState(emptyCat)
  const [file, setFile] = useState()
  const addCatMutuation = useMutation({
    mutationFn: addMissingCatApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['missing_cats'])
      setFormData(emptyCat)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formInfo = Object.assign({"missingImageUrl": file}, formData)
    //console.log(formInfo) //Remember to Delete
    try {
      addCatMutuation.mutate(formInfo)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setFile(e.target.files[0])
      //console.log(formData.missingImageUrl)
    } else if (e.target.name === 'microchip') {
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
          type="text"
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

        <label htmlFor="microchip">MICROCHIPPED?</label>
        <select
          id="microchip"
          name="microchip"
          value={formData.microchip}
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
