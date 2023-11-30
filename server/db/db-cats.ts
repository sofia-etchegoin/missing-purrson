import connection from './connection'
import { Cat } from '../../models/cats'

export async function getAllMissingCatsDb(db = connection): Promise<Cat[]> {
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
): Promise<Cat[]> {
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

export async function getOneSightedCatDb(
  id: number,
  db = connection,
): Promise<Cat[]> {
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
