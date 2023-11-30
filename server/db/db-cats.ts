import connection from './connection'
import {
  MissingCat,
  SightedCat,
  NewMissingCat,
  NewSightedCat,
} from '../../models/cats'

export async function getAllMissingCatsDb(
  db = connection,
): Promise<MissingCat[]> {
  return await db('missing_cats').select(
    'cat_id as catId',
    'microchip',
    'microchip_number as microChipNumber',
    'user_id_mc as userIdMc',
    'cat_name as catName',
    'breed',
    'color',
    'description',
    'date_lost as dateLost',
    'location',
    'missing_cat_phone as missingCatPhone',
    'missing_cat_email as missingCatEmail',
    'missing_image_url as missingImageUrl',
    'cat_missing as catMissing',
  )
}

export async function getOneMissingCatDb(
  id: number,
  db = connection,
): Promise<MissingCat[]> {
  return await db('missing_cats')
    .select(
      'cat_id as catId',
      'microchip',
      'microchip_number as microChipNumber',
      'user_id_mc as userIdMc',
      'cat_name as catName',
      'breed',
      'color',
      'description',
      'date_lost as dateLost',
      'location',
      'missing_cat_phone as missingCatPhone',
      'missing_cat_email as missingCatEmail',
      'missing_image_url as missingImageUrl',
      'cat_missing as catMissing',
    )
    .where('cat_id', id)
    .first()
}

export async function deleteMissingCatDb(
  id: number,
  db = connection,
): Promise<void> {
  try {
    const result = await db('missing_cats').where({ cat_id: id }).delete()
    console.log(result)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function addMissingCatDb(
  newCat: NewMissingCat,
): Promise<MissingCat[]> {
  try {
    const [newCatId] = await connection('missing_cats').insert({
      microchip: newCat.microchip,
      microchip_number: newCat.microChipNumber,
      user_id_mc: newCat.userIdMc,
      cat_name: newCat.catName,
      breed: newCat.breed,
      color: newCat.color,
      description: newCat.description,
      date_lost: newCat.dateLost,
      location: newCat.location,
      cat_missing: newCat.catMissing,
    })

    const newAddedCat = await getOneMissingCatDb(newCatId)
    return newAddedCat
  } catch (error) {
    console.error('Error in addCat:', error)
    throw error
  }
}

//SIGHTED CATS FROM HERE

export async function getAllSightedCatsDb(
  db = connection,
): Promise<SightedCat[]> {
  return await db('sighted_cats').select(
    'sighted_cat_id as sightedCatId',
    'user_id_sc as userIdSc',
    'cat_id_mc as catIdMc',
    'color',
    'description',
    'date_seen as dateSeen',
    'location',
    'sighted_cat_phone as sightedCatPhone',
    'sighted_cat_email as sightedCatEmail',
    'sighted_image_url as sightedImageUrl',
  )
}

export async function getOneSightedCatDb(
  id: number,
  db = connection,
): Promise<SightedCat[]> {
  return await db('sighted_cats')
    .select(
      'sighted_cat_id as sightedCatId',
      'user_id_sc as userIdSc',
      'cat_id_mc as catIdMc',
      'color',
      'description',
      'date_seen as dateSeen',
      'location',
      'sighted_cat_phone as sightedCatPhone',
      'sighted_cat_email as sightedCatEmail',
      'sighted_image_url as sightedImageUrl',
    )
    .where('sighted_cat_id', id)
    .first()
}

export async function addSightedCatDb(
  newCat: NewSightedCat,
  db = connection,
): Promise<SightedCat[]> {
  try {
    const [newCatId] = await db('sighted_cats').insert({
      user_id_sc: newCat.userIdSc,
      cat_id_mc: newCat.catIdMc,
      color: newCat.color,
      description: newCat.description,
      date_seen: newCat.dateSeen,
      location: newCat.location,
      sighted_cat_phone: newCat.sightedCatPhone,
      sighted_cat_email: newCat.sightedCatEmail,
      sighted_image_url: newCat.sightedImageUrl,
    })

    const newAddedCat = await getOneSightedCatDb(newCatId)
    return newAddedCat
  } catch (error) {
    console.error('Error in addCat:', error)
    throw error
  }
}

export async function singleCatSightingsDb(
  cat_id: number,
  db = connection,
): Promise<SightedCat[]> {
  try {
    const sightedCats = await db('sighted_cats')
      .select()
      .where('cat_id_mc', cat_id)

    return sightedCats
  } catch (error) {
    console.error('Error. No sightings for this cat:', error)
    throw error
  }
}

export function close(db = connection) {
  db.destroy
}
