import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
//import addCatApi

const emptyCat = {
  name: '',
  location: '',
  date_lost: '',
  color: '',
  breed: '',
  description: '',
  email: '',
  phone: '',
  microchipped: '',
  microchip_number: '',
}

export default function AddCat() {
  const queryClient = useQueryClient()

  const addCatMutuation = useMutation({
    mutationFn: addCatApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['missing_cats'])
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div>
        <h1>Missing your kitty?</h1>
      </div>
      <form action="/addCat" onSubmit={handleSubmit} method="POST"></form>
    </>
  )
}
