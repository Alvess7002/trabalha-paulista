import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Courses from './pages/Courses'
import Business from './pages/Business'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vagas" element={<Jobs />} />
        <Route path="capacitacao" element={<Courses />} />
        <Route path="empreendedorismo" element={<Business />} />
        <Route path="sobre" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}