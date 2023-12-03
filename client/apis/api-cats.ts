import request from 'superagent'
import { MissingCat, NewMissingCat } from '../../models/cats'
const rootUrl = '/api/v1'

// GET all missing cats (/api/v1/missingcats)

export async function getAllMissingCatsApi(): Promise<MissingCat[]> {
  try {
    const response = await request.get(`${rootUrl}/missingcats`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching missing cats', error)
  }
}

// GET one missing cat (/api/v1/missingcats/singlecat/:id)

export async function getOneMissingCatApi(catId: number): Promise<MissingCat> {
  try {
    const response = await request.get(
      `${rootUrl}/missingcats/singlecat/${catId}`,
    )
    return response.body
  } catch (error) {
    console.error(`Error fetching cat with id ${catId}: `, error)
    throw new Error(`Failed to fetch cat with id ${catId}`)
  }
}

// ADD missing cat (/api/v1/missingcats/addcat)

export async function addMissingCatApi(formData: any) {
  console.log('API-Cat')
  try {
    console.log(formData)
    const response = await request
      .post(`${rootUrl}/missingcats/addcat`)
      .send(formData)
    return response.body
  } catch (error) {
    console.error(`Error adding cat `, error)
  }
}

// DELETE a missing cat (/api/v1/missingcats/:id)

export async function deleteMissingCatApi(missingCatId: number) {
  try {
    const response = await request.delete(
      `${rootUrl}/missingcats/${missingCatId}`,
    )
    return response.body
  } catch (error) {
    console.error(`Error deleting cat, `, error)
  }
}

// ----- CAT SIGHTINGS ----- //

// GET sightings for a particular cat (/api/v1/sightedcats/singlecat/sighting/:catIdMc)

export async function getCatSightingsApi(catIdMc: number) {
  try {
    const response = await request.get(
      `${rootUrl}/sightedcats/singlecat/sighting/${catIdMc}`,
    )
    return response.body
  } catch (error) {
    console.error('Error fetching cat sightings', error)
    return { error: 'Failed to fetch cat sightings' }
  }
}

// ADD a cat sighting for a particular cat (/api/v1/sightedcats/:catIdMc)

export async function addCatSightingApi(
  sightedCat: NewSightedCat,
  catIdMc: number,
) {
  try {
    const response = await request
      .post(`${rootUrl}/sightedcats/${catIdMc}/add`)
      .send(sightedCat)
    return response.body
  } catch (error) {
    console.error(`Error adding cat sighting`, error)
  }
}
