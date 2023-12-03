import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>Missing Purrson</h1>
      <h2>What we stand for</h2>
      <h2>
        It&apos;s never easy when a member of your family is lost, we&apos;re
        here to act as a dedicated space to list your missing kitty!
      </h2>
      <Link to="/addcat">
        <button>List a cat</button>
      </Link>
      <Link to="/missingcats">
        <button>Missing cats</button>
      </Link>
    </>
  )
}