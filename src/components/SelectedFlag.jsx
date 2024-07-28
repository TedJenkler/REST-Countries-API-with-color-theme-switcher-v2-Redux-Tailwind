import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSearch, getNameByCode } from '../features/state/stateSlice';
import Nav from './Nav';
import backarrow from '../assets/back.png';
import backarrowlight from '../assets/backlight.png'

function SelectedFlag() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const data = useSelector((state) => state.state.data);
    const theme = useSelector((state) => state.state.theme);
    const [borderNames, setBorderNames] = useState({});

    useEffect(() => {
        dispatch(getSearch(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (data?.length > 0 && data[0]?.borders) {
            const fetchBorderNames = async () => {
                const names = {};
                for (const code of data[0].borders) {
                    try {
                        const response = await dispatch(getNameByCode(code));
                        if (response.payload && response.payload[0]?.name?.common) {
                            names[code] = response.payload[0].name.common;
                        } else {
                            names[code] = code;
                        }
                    } catch (error) {
                        console.error('Failed to fetch country name:', error);
                        names[code] = code;
                    }
                }
                setBorderNames(names);
            };

            fetchBorderNames();
        }
    }, [data, dispatch]);

    const getNativeNames = (nativeName) => {
        const names = Object.values(nativeName)?.map(nameObj => nameObj.common).filter(name => name);
        return names.length > 0 ? names.join(', ') : 'N/A';
    };

    const handleSwap = (code) => {
        navigate(`/code/${code}`);
    };

    if (!data || data.length === 0) {
        return <p>Loading...</p>;
    }

    const { flags, name, population, region, subregion, capital, tld, currencies, languages, borders } = data[0];

    return (
        <div className={`min-h-screen ${theme ? 'bg-lightbg text-black' : 'bg-darkbg text-white'}`}>
            <Nav />
            <div className='mt-10 mb-16 ml-7'>
                <Link to="/" className={`flex justify-between items-center ${theme ? "bg-white text-black" : "bg-lightgrey text-white"} gap-2 px-6 w-[6.5rem] h-8 drop-shadow-sm rounded-sm`}>
                    <img className='h-5 w-5' src={theme ? backarrow : backarrowlight} alt='backbtn' />
                    <p>Back</p>
                </Link>
            </div>
            <div className='px-6'>
                <img src={flags.png} alt='flag' className='w-[20rem] h-[14.313rem] mb-4 rounded-[0.358rem]' />
                <h1 className='text-[1.375rem] font-extrabold leading-[auto] mb-4'>{name.common}</h1>
                <p className='text-sm font-semibold mb-2'>Native Names: <span className='font-light'>{getNativeNames(name.nativeName)}</span></p>
                <p className='text-sm font-semibold mb-2'>Population: <span className='font-light'>{population}</span></p>
                <p className='text-sm font-semibold mb-2'>Region: <span className='font-light'>{region}</span></p>
                <p className='text-sm font-semibold mb-2'>Sub Region: <span className='font-light'>{subregion}</span></p>
                <p className='text-sm font-semibold mb-8'>Capital: <span className='font-light'>{capital}</span></p>
                <p className='text-sm font-semibold mb-2'>Top Level Domain: <span className='font-light'>{tld.join(', ')}</span></p>
                <p className='text-sm font-semibold mb-2'>Currencies: <span className='font-light'>{Object.values(currencies).map((currency) => (
                    <span key={currency.name}>{currency.name} </span>
                ))}</span></p>
                <p className='text-sm font-semibold mb-8'>Languages: <span className='font-light'>{Object.values(languages).map((language) => (
                    <span key={language}>{language} </span>
                ))}</span></p>
                <div className='text-sm font-semibold mb-2'>
                    <h2 className='text-base font-semibold leading-6 mb-4'>Border Countries:</h2>
                    <div className='flex flex-wrap gap-[0.625rem] font-light'>
                        {borders?.length > 0 ? borders.map((country) => (
                            <Link 
                                onClick={() => handleSwap(country)} 
                                key={country} 
                                className={`flex items-center justify-center ${theme ? "bg-white text-black" : "bg-lightgrey text-white"} min-w-[6rem] h-[1.75rem] drop-shadow-lg text-center overflow-hidden whitespace-nowrap`}
                            >
                                {borderNames[country] || country}
                            </Link>
                        )) : 'None'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectedFlag;