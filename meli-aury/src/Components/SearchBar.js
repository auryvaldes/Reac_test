import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import logo from '../image/logo.png'
import ProductsPage from './ProductsPage'



const SearchBar = () => {
    const { WrappContainer, inputBar, logoMeli, lupaSearch } = styles;
    const [persistFound, setpersistFound] = useState('');
    const [data, setData] = useState('');



    const ApiCall = (value) => {
        let params = value ? `?query=${value}` : ''
        fetch(`/api/items${params}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result)
                    console.log(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <><div style={WrappContainer}>
            <img style={logoMeli} src={logo} alt='' />
            <input style={inputBar}
                type='search'
                value={persistFound}
                onChange={(e) => setpersistFound(e.target.value)}
                className='input'
                placeholder='Nunca dejes de buscar' />
            <BiSearchAlt2 onClick={() => ApiCall(persistFound)} style={lupaSearch} />
        </div><ProductsPage path="/"  ApiCall={data} /></>
    )
}

const styles = {
    WrappContainer: {
        display: 'flex',
        justifyContent: 'start',
        background: '#FFE600',
    },
    inputBar: {
        width: '80%',
        border: 'none',
        padding: '0.5rem',
        marginTop: '0.3rem',
        marginBottom: '0.3rem',
        borderTopLeftRadius: '0.3rem',
        borderBottomLeftRadius: '0.3rem',
        marginLeft: '1rem',

    },
    logoMeli: {
        marginLeft: '6rem',
        padding: '0.3rem',
        width: '3rem',
    },
    lupaSearch: {
        background: '#EEEEEE',
        width: '2rem',
        marginTop: '0.3rem',
        marginBottom: '0.3rem',
        borderTopRightRadius: '0.5rem',
        borderBottomRightRadius: '0.5rem',
        height: '2.2rem',
        color: 'gray',
    },
};

export default SearchBar;