import React from 'react'
import Navbar from '../NavBar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  
    return (
        <div>
          <Navbar/>
          <div className="container">
              <Outlet />
          </div>
        </div>
    )
  }
  
  export default MainLayout