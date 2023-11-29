import connection from './connection.ts'
import { Cat } from '../../models/cats.ts'

export async function getAllFruits(db = connection): Promise<Cat[]> {
  return db('').select()
}
