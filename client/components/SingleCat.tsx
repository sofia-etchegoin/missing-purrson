import { Link, useParams } from 'react-router-dom'
import { getOneMissingCatApi } from '../apis/api-cats'
import { useQuery } from '@tanstack/react-query'
import { MissingCat } from '../../models/cats'

export default function SingleCat() {
  const { catId } = useParams<{ catId: string }>()

  const {
    data: missingcats,
    isLoading,
    isError,
  } = useQuery<MissingCat, Error>(['missing_cats', catId], () => {
    return getOneMissingCatApi(Number(catId))
  })

  if (isError) {
    return <p>YEEEOOOWWWW! No kitties to be found!</p>
  }

  if (!missingcats || isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div>
        <h1>{missingcats.catName}</h1>
        <h2>{missingcats.location}</h2>
        <h2>Description {missingcats.description}</h2>
      </div>

      <div>
        <h2>Last seen: {missingcats.dateLost}</h2>
        <h2>Breed: {missingcats.breed}</h2>
        <h2>Color: {missingcats.color}</h2>
        <h2>Microchipped: {missingcats.microchip ? 'Yes' : 'No'}</h2>
      </div>
      <Link to={`/sightings/${catId}`}>
        <button>Sightings</button>
      </Link>
      <div className="test">
        <img
          alt={missingcats.description}
          src={`/` + missingcats.missingImageUrl}
        />
      </div>
    </>
  )
}
