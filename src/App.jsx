import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import { Suspense, lazy } from 'react';

import Login from './components/Login/login.jsx'
import Register from './components/Register/register.jsx'
import Superadmin from './components/SuperAdmin/superadmin.jsx'
import User from './components/User/user.jsx'
import Admin from './components/Admin/admin.jsx'
import Sidebar from './components/Sidebar/sidebar.jsx'
import Loading from './components/Loading/Loading.jsx'

import ProtectedRoute from './components/Protected/ProtectedRoutes'




function App() {
  return (

      <Suspense fallback={<Loading />}>
    <Routes>



        <Route path="/load" element={<Loading />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user" element={<User />} />
        </Route>


        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path="/superadmin" element={<Superadmin />} />
        </Route>

    </Routes>
      </Suspense>
  )
}

export default App
