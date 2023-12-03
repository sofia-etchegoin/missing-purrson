import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import MissingCatList from './components/MissingCatList'
import SingleCat from './components/SingleCat'
import AddMissingCat from './components/AddMissingCat'
import CatSightings from './components/CatSightings'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="cats" element={<MissingCatList />} />
        <Route path="singlecat/:id" element={<SingleCat />} />
        <Route path="addcat" element={<AddMissingCat />} />
        <Route path="singlecat/sighting/:id" element={<CatSightings />} />
      </Route>
    </>,
  ),
)

export default router
