import React, { useState } from 'react';
import searchIcon from '../assets/search.png';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../features/state/stateSlice';

function Search() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.state.theme);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        dispatch(getSearch(value));
    };

    return (
        <div className={`flex items-center gap-6 w-[21.438rem] h-12 ${theme ? "bg-white text-black" : "bg-lightgrey text-white"} rounded-[0.313rem] px-8 drop-shadow-sm`}>
            <img htmlFor="input" className='h-4 w-4' src={searchIcon} alt='search' />
            <input 
                onChange={handleChange} 
                value={search} 
                id='input' 
                type='text' 
                name='input' 
                className={`h-full outline-none text-xs leading-5 ${theme ? "bg-white text-black" : "bg-lightgrey text-white"}`}
                placeholder='Search for a country…'
            />
        </div>
    );
}

export default Search;