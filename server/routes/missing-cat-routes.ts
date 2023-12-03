import { Router } from 'express'
import * as db from '../db/db-cats'

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'server/images/missing_cats')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage })

const router = Router()

//GET localhost:5173/api/v1/missingcats/
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

//GET localhost:5173/api/v1/missingcats/singlecat/:id
router.get('/singlecat/:catId', async (req, res) => {
  try {
    const catId = Number(req.params.catId)
    const missingCats = await db.getOneMissingCatDb(catId)
    res.json(missingCats)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// DELETE localhost:5173/api/v1/missingcats/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
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


// POST localhost:5173/api/v1/missingcats/addcat

router.post('/addcat', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }
    const newCat = await db.addMissingCatDb({
      ...req.body,
      missingImageUrl: req.file.filename,
    })
    res.status(201).json(newCat)
  } catch (err) {
    console.error('Error in POST /api/v1/addCat', err)
    res.status(500).json('Internal Server Error')
  }
})

export default router
