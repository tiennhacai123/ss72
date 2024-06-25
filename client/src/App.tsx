
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'

export default function App() {
  return (
    <div>App
      <Routes>
        <Route path='/admin' element={<Admin></Admin>}></Route>
      </Routes>
    </div>
  )
}