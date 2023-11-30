import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import MissingCatList from './components/MissingCatList'
import SingleCat from './components/SingleCat'
import AddCat from './components/AddCat'
import CatSightings from './components/CatSightings'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="cats" element={<MissingCatList />} />
    <Route path="singleCat/:id" element={<SingleCat />} />
    <Route path="addCat" element={<AddCat />} />
    <Route path="singleCat/sighting/:id" element={<CatSightings />} />
  </Route>,
)
