import React, { useState } from 'react';

import { BiSearchAlt2 } from 'react-icons/bi';
import Divider from '@material-ui/core/Divider'

import logo from '../image/logo.png'
import shipping from '../image/ic_shipping.png'


const ProductsPage = () => {
  const { searchBar, WrappContainer, logoMeli, lupaSearch, productsList_ul,
    productsList_li, productsList_img, WrappContainerSeacr, WrappContainer_ul, 
    img_shipping, productsList_state } = styles;

  const [persistFound, setpersistFound] = useState('');
  const [foundproducts, setFoundproducts] = useState();

  const ApiCall = (value) => {
    let params = value ? `?query=${value}` : ''
    fetch(`/api/items${params}`)
      .then(res => res.json())
      .then(
        (result) => {
          setFoundproducts(result)
          console.log(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <div style={WrappContainer}>
      <div style={WrappContainerSeacr}>
        <img style={logoMeli} src={logo} alt='' />
        <input style={searchBar}
          type='search'
          value={persistFound}
          onChange={(e) => setpersistFound(e.target.value)}
          className='input'
          placeholder='Nunca dejes de buscar' />
        <BiSearchAlt2 onClick={() => ApiCall(persistFound)} style={lupaSearch} />
      </div>
      <div style={WrappContainer_ul}>
        {foundproducts && foundproducts.items.length > 0 ? (
          foundproducts.items.map((prod => (
            <><><ul key={prod.id} style={productsList_ul}>
              <li>
                <img src={prod.picture} alt="" style={productsList_img} />
              </li>
              <li style={productsList_li}>
                <div>
                  {prod.free_shipping ? (
                    <img style={img_shipping} src={shipping} alt='' />
                  ) : ('')}
                  {prod.price.currency === 'ARS' ? (
                    <span>$ {prod.price.amount}</span>
                  ) : (<span>$USD {prod.price.amount}</span>
                  )}
                </div>
                <span>{prod.title}</span>
              <span style={productsList_state}>{prod.state_name}</span>
              </li>
            </ul><Divider /></></>
          ))
          )) : ('')}
      </div>
    </div>
  );
};

const styles = {
  WrappContainer: {
    backgroundColor: '#EEEEEE',
  },
  WrappContainer_ul: {
    backgroundColor: 'white',
    alignContent: 'center',
    marginInlineStart: '16rem',
    marginInlineEnd: '16rem',

  },
  searchBar: {
    width: '80%',
    border: 'none',
    padding: '0.5rem',
    marginTop: '0.3rem',
    marginBottom: '0.3rem',
    borderTopLeftRadius: '0.3rem',
    borderBottomLeftRadius: '0.3rem',
    marginLeft: '1rem',

  },
  WrappContainerSeacr: {
    display: 'flex',
    justifyContent: 'start',
    background: '#FFE600',
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
  productsList_ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: 'max-content',

  },
  productsList_li: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productsList_img: {
    width: '15rem',
    marginRight: '5rem',

  },
  img_shipping: {
    marginRight: '0.6rem',
  },
  productsList_state: {
    color: 'gray',
    alignSelf: 'flex-end',
    marginLeft: '30rem',
  }

};

export default ProductsPage;

