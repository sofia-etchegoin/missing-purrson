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
    'location_lat as locationLat',
    'location_lng as locationLng',
    'cat_missing as catMissing',
  )
}

export async function getOneMissingCatDb(
  id: number,
  db = connection,
): Promise<Cat[]> {
  return await db('missing_cats').select('*').where('cat_id', id)
}
