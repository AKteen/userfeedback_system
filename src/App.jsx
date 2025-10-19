import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './components/Login/login.jsx'
import Superadmin from './components/SuperAdmin/superadmin.jsx'
import User from './components/User/user.jsx'
import Admin from './components/Admin/admin.jsx'
import Sidebar from './components/Sidebar/sidebar.jsx'

import Protected from './components/Protected/ProtectedRoutes'




function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />   {/* default route */}
        <Route path="/login" element={<Login />} />
        <Route element={<Protected allowedRoles={["user"]} />}>
          <Route path="/user" element={<User />} /> 
        </Route>
        <Route element={<Protected allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<Protected allowedRoles={["superadmin"]} />}>
          <Route path="/superadmin" element={<Superadmin />} />
        </Route>
      </Routes>
  )
}

export default App
