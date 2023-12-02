import { Link, useParams } from 'react-router-dom'

export default function SingleCat() {
  const { catId } = useParams()

  return (
    <>
      <Link to={`/sightings/${catId}`}>
        <button>Sightings</button>
      </Link>
    </>
  )
}
