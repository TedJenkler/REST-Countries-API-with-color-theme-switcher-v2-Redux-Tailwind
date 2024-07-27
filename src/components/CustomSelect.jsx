import React, { useEffect, useState, useRef } from 'react';
import arrow from '../assets/arrow.png';
import { getRegion } from '../features/state/stateSlice';
import { useDispatch } from 'react-redux';

const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

function CustomSelect() {
    const [open, setOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("Filter by Region");
    const dispatch = useDispatch();
    const selectRef = useRef(null);

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleFilter = (region) => {
        setSelectedRegion(region);
        dispatch(getRegion(region));
        setOpen(false);
    };

    return (
        <>
            <div 
                onClick={() => setOpen(!open)} 
                className='flex items-center justify-between px-6 w-[12.5rem] h-12 bg-white ml-4 rounded-[0.313rem] drop-shadow-sm cursor-pointer'
                ref={selectRef}
            >
                <p className='text-xs leading-5'>{selectedRegion}</p>
                <img src={arrow} alt='arrow' className={`w-3 h-3 transition-transform ${open ? 'transform rotate-180' : ''}`} />
            </div>
            <div className={`absolute z-50 left-4 mt-1 bg-white transition-transform transform ${open ? 'scale-y-100' : 'scale-y-0'} origin-top`} style={{ transitionDuration: '300ms' }}>
                {regions.map((region, index) => (
                    <div 
                        onClick={() => handleFilter(region)} 
                        key={index} 
                        className='h-[1.8rem] w-[12.5rem] px-6 py-1 cursor-pointer hover:bg-gray-100'
                    >
                        <p>{region}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CustomSelect;