import { Router } from 'express'
import * as db from '../db/db-cats'

const router = Router()

//GET localhost:5173/api/v1/cats/
router.get('/', async (req, res) => {
  try {
    const cats = await db.getAllMissingCatsDb()
    //console.log(cats)
    res.json(cats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//GET localhost:5173/api/v1/cats/singlecat/:id
router.get('/singlecat/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const cats = await db.getOneMissingCatDb(id)
    //console.log(cats)
    res.json(cats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET localhost:5173/api/v1/cats/singlecat/sighting/:id
router.get('/singlecat/sighting/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const cats = await db.getOneSightedCatDb(id)
    //console.log(cats)
    res.json(cats)
    if (!cats) {
      res.status(404).json({ error: 'id could not be found' })
      return cats
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// DELETE /api/v1/cats/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  console.log('Deleting cat with ID:', id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }

  try {
    await db.deleteMissingCatDb(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete cat')
  }
})

// POST /api/v1/cats/addcat
router.post('/addcat', async (req, res) => {
  try {
    const newCat = await db.addMissingCatDb(req.body)
    res.status(201).json(newCat)
  } catch (err) {
    console.error('Error in POST /api/v1/addCat', err)
    res.status(500).json('Internal Server Error')
  }
})

export default router
