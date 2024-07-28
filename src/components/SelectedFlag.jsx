import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSearch } from '../features/state/stateSlice';
import Nav from './Nav';
import backarrow from '../assets/back.png';

function SelectedFlag() {
    const dispatch = useDispatch();
    const params = useParams();
    const data = useSelector((state) => state.state.data);

    useEffect(() => {
        dispatch(getSearch(params.id));
    }, [dispatch, params.id]);

    const getNativeNames = (nativeName) => {
        const names = Object.values(nativeName).map(nameObj => nameObj.common).filter(name => name);
        return names.length > 0 ? names.join(', ') : 'N/A';
    };

    return (
        <div className='bg-lightbg min-h-screen'>
            <Nav />
            <div className='mt-10 mb-16 ml-7'>
                <div className='flex justify-between items-center bg-white gap-2 px-6 w-[6.5rem] h-8 drop-shadow-sm rounded-sm'>
                    <img className='h-5 w-5' src={backarrow} alt='backbtn' />
                    <p>Back</p>
                </div>
            </div>
            {data && data.length > 0 ? (
                <div className='px-6 text-black'>
                    <img src={data[0].flags.png} alt='flag' className='w-[20rem] h-[14.313rem] mb-4' />
                    <h1 className='text-[1.375rem] font-extrabold leading-[auto] mb-4'>{data[0].name.common}</h1>
                    <p className='text-sm font-semibold mb-2'>Native Names: <span className='font-light'>{getNativeNames(data[0].name.nativeName)}</span></p>
                    <p className='text-sm font-semibold mb-2'>Population: <span className='font-light'>{data[0].population}</span></p>
                    <p className='text-sm font-semibold mb-2'>Region: <span className='font-light'>{data[0].region}</span></p>
                    <p className='text-sm font-semibold mb-2'>Sub Region: <span className='font-light'>{data[0].subregion}</span></p>
                    <p className='text-sm font-semibold mb-8'>Capital: <span className='font-light'>{data[0].capital}</span></p>
                    <p className='text-sm font-semibold mb-2'>Top Level Domain: <span className='font-light'>{data[0].tld.join(', ')}</span></p>
                    <p className='text-sm font-semibold mb-2'>Currencies: <span className='font-light'>{Object.values(data[0].currencies).map((currency) => (
                        <span key={currency.name}>{currency.name} </span>
                    ))}</span></p>
                    <p className='text-sm font-semibold mb-8'>Languages: <span className='font-light'>{Object.values(data[0].languages).map((language) => (
                        <span key={language}>{language} </span>
                    ))}</span></p>
                    <div className='text-sm font-semibold mb-2'>
                        <h2 className='text-base font-semibold leading-6 mb-4'>Border Countries:</h2>
                        <div className='flex gap-[0.625rem] font-light'>{data[0].borders.length > 0 ? data[0].borders.map((country, index) => (
                            <div key={index} className='flex items-center justify-center bg-white mr-2 w-[6rem] h-[1.75rem] drop-shadow-lg'>{country}</div>
                        )) : 'None'}</div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SelectedFlag;