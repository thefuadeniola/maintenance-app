import React from 'react'
import logo from '../assets/icons/logo.svg'
import { sideNavLinks, bottomNav } from '../data'
import { NavLink } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/Context'


const SideNav = () => {

  const {logout} = useStateContext();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout()
    navigate('/')
}

  return (
    <div className = 'hidden md:block sidenav bg-secondary-bg relative'>
        <div className='flex flex-row items-center gap-[5px]'>
          <h1 className='text-base font-semibold'>E-Maintenance Portal</h1>
        </div>

        <div className='mt-[5.3vh] flex flex-col space-y-[4.07vh]'>
            {
              sideNavLinks.map((link) => (
                <NavLink key={link.name} to={link.link} 
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isActive ? "selected flex items-center pl-2" : "unselected pl-2",
                  ].join(" ")
                }
                >
                  <h4 className='text-base'>{link.name}</h4>
                </NavLink>
              ))
            }
        </div>

        <div className='absolute bottom-12 left-8'>
          <button className='text-[#dd0612] underline' onClick={signOut} >
          Logout
          </button>
        </div>

    </div>
  )
}

export default SideNav

// Hostel Name
// Fuad Leye
// Broken Link
// high, medium, low
// staff ==> office*
// footer