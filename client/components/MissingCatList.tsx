import { useQuery } from '@tanstack/react-query'
import { getAllMissingCatsApi } from '../apis/api-cats'
import { Link } from 'react-router-dom'

export default function MissingCatList() {
  const {
    data: missingcats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['missing_cats'],
    queryFn: () => {
      return getAllMissingCatsApi()
    },
  })

  if (isError) {
    return <p>YEEEOOOWWWW! No kitties to be found!</p>
  }

  if (!missingcats || isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>These kitties need your help!</h1>
      <div className="missing-cat-list">
        {missingcats?.map((cat) => (
          <ul key={cat.catId}>
            <li>{cat.catName}</li>
            <li>{cat.location}</li>
            <li>{cat.description}</li>
            <Link to={`/singlecat/${cat.catId}`}>
              <button>More info</button>
            </Link>
          </ul>
        ))}
      </div>
    </>
  )
}
