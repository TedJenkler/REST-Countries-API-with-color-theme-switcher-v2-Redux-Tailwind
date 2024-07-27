import React from 'react'
import lightmoon from '../assets/lightmoon.png'
import darkmoon from '../assets/darkmoon.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/state/stateSlice';

function Nav() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.state.theme);

    const handleTheme = () => {
        if(theme) {
            dispatch(toggleTheme(false))
        }else {
            dispatch(toggleTheme(true))
        }
    }

  return (
    <nav className={`flex justify-between items-center px-4 min-h-20 min-w-full drop-shadow-sm ${theme ? "bg-white text-black" : "bg-lightgrey text-white"}`}>
        <h1 className='font-extrabold text-sm leading-5'>Where in the world?</h1>
        <button onClick={handleTheme} className='flex gap-2 items-center'><img src={theme ? lightmoon : darkmoon} alt='lighticon' />Dark Mode</button>
    </nav>
  )
}

export default Nav
