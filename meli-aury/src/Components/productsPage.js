//importacion de las librerias

import React, { useState } from 'react';

import { BiSearchAlt2 } from 'react-icons/bi';
import Divider from '@material-ui/core/Divider'
import { BrowserRouter as Router, Switch, Route, useParams, Link } from "react-router-dom";

import logo from '../image/logo.png'
import shipping from '../image/ic_shipping.png'


const ProductsPage = () => {
  //declaracion de las variables de style
  const { searchBar, WrappContainer, logoMeli, lupaSearch, productsList_ul,
    productsList_li, productsList_img, WrappContainerSeacr, WrappContainer_ul,
    img_shipping, productsList_title, productsList_state } = styles;

  // declaracacion de la variable y las fusiones que me permiten obtener la lista de productos
  const [persistFound, setpersistFound] = useState('');
  const [foundproducts, setFoundproducts] = useState();
  const [userData, setUserData] = useState({});

  //fucion que optiene los datos de la api y actuliza al componente  a traves del useState
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

  const ApiCall2 = (value) => {
    let params = value ? value : ''
    fetch(`/api/items/${params}`)
      .then(res => res.json())
      .then(
        (result) => {
          setUserData(result)
          console.log(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    /* WrappContainer de la primera pantallas:
    Se encuentra la seacrhBar con sus metetodos de invocacion a la api, no logre rerpducir de manera limpia que se llama a traves del enter
    por que lo que decidí dejar el llamado solo desde el clik en la lupa.
    luego tenemos el result de la lista de productos recibidos despues del envio del parametro introducido en en input*/
    <Router>
      <div>
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
                <><>
                  <ul key={prod.id} style={productsList_ul}>
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
                      {userData ? (
                        <Link to={`${prod.id}/description`} onClick={() => ApiCall2(prod.id)}>
                          <span style={productsList_title}>{prod.title}</span>
                        </Link>
                      ) : ('')}
                      <span style={productsList_state}>{prod.state_name}</span>
                    </li>
                  </ul><Divider />
                </></>
              ))
              )) : ('')}
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/:id" children={<Child />}>
        </Route>
      </Switch>
    </Router>
  );
};

const Child = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

//armado de los styles
const styles = {
  WrappContainer: {
    backgroundColor: '#EEEEEE',
  },
  WrappContainer_ul: {
    backgroundColor: 'white',
    alignContent: 'center',
    maxWidth: 'max-content',
    marginLeft: '8rem',
    alignItems: 'stretch',
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
  productsList_title: {
    maxWidth: 'fit-content',
    paddingRight: '4rem',
    marginRight: '10rem',
  },
  productsList_state: {
    color: 'gray',
    alignSelf: 'flex-end',
    marginLeft: '40rem',
    marginRight: '2rem',
  }

};

export default ProductsPage;

