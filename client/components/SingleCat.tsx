import { Link, useParams } from 'react-router-dom'
import { getOneMissingCatApi } from '../apis/api-cats'
import { useQuery } from '@tanstack/react-query'
import { MissingCat } from '../../models/cats'
import Nav from './Nav'

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
  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
      />
      <section className="single-cat">
        <div className="single-cat__left">
          <div className="single-cat-back">
            <Link className="single-cat-link" to="/missingcats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              All Cats
            </Link>
          </div>
          <div className="single-cat__img">
            <img
              src={`/` + missingcats.missingImageUrl}
              alt=""
              className="single-cat-img"
            />
          </div>
        </div>
        <div className="single-cat__right">
          <div className="single-cat__header">
            <h1 className="single-cat-heading">{missingcats.catName}</h1>
            <h2 className="single-cat-subheading">{missingcats.location}</h2>
          </div>
          <div className="single-cat__description">
            <h3 className="single-cat-info-heading">Description</h3>
            <p className="single-cat-description">{missingcats.description}</p>
          </div>
          <div className="single-cat__table">
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Last Seen</h3>
              <p className="single-cat-info-body">
                {missingcats.dateLost.toString()}
              </p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Breed</h3>
              <p className="single-cat-info-body">{missingcats.breed}</p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Colour</h3>
              <p className="single-cat-info-body">{missingcats.color}</p>
            </div>
            {missingcats.microchip && (
              <>
                <div className="single-cat__section">
                  <h3 className="single-cat-info-heading">Microchipped?</h3>
                  <p className="single-cat-info-body">Yes</p>
                </div>
                <div className="single-cat__section">
                  <h3 className="single-cat-info-heading">Microchip Number</h3>
                  <p className="single-cat-info-body">
                    {missingcats.microChipNumber}
                  </p>
                </div>
              </>
            )}
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Owner Email</h3>
              <p className="single-cat-info-body">
                {missingcats.missingCatEmail}
              </p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Owner Email</h3>
              <p className="single-cat-info-body">
                {missingcats.missingCatPhone}
              </p>
            </div>
          </div>
          <div className="single-cat__link">
            <Link className="single-cat-link" to={`/sightings/${catId}`}>
              Sightings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
