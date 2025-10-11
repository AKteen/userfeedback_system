import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './components/Login/login.jsx'
import Superadmin from './components/SuperAdmin/superadmin.jsx'
import User from './components/User/user.jsx'
import Admin from './components/Admin/admin.jsx'
import Sidebar from './components/Sidebar/sidebar.jsx'

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Superadmin />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
