import { Router } from 'express'
import * as db from '../db/db-cats'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const cats = await db.getAllMissingCats()
    //console.log(cats)
    res.json(cats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/singlecat/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const cats = await db.getAMissingCatById(id)
    //console.log(cats)
    res.json(cats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
