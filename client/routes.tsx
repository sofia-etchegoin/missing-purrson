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
    <Route path="singlecat/:id" element={<SingleCat />} />
    <Route path="addcat" element={<AddCat />} />
    <Route path="singlecat/sighting/:id" element={<CatSightings />} />
  </Route>,
)
