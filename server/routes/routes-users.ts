import { Router } from 'express'
import * as db from '../db/db-users'

const router = Router()

//GET localhost:5173/api/v1/user/:auth0Id'
router.get('/:Auth0Id', async (req, res) => {
  const auth0Id = req.params.Auth0Id
  try {
    const user = await db.getAUserDb(auth0Id)
    if (!user) {
      res.status(404)
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong on User Route' })
  }
})

// POST localhost:5173/api/v1/user/adduser
router.post('/adduser', async (req, res) => {
  try {
    const newUser = await db.addAUserDb(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    console.error('Error in POST /api/v1/newUser', err)
    res.status(500).json('Internal Server Error')
  }
})

export default router
