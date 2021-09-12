import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider'
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import shipping from '../image/ic_shipping.png'
import ProductsDetail from './ProductsDetail'



const ProductsPage = ({ ApiCall }) => {
  console.log(ApiCall);
  const { WrappContainer, productsList_ul, productsList_li, productsList_img, WrappContainer_ul,
    img_shipping, productsList_title, productsList_state } = styles;


  const [userData, setUserData] = useState('');
  const foundproducts = ApiCall;

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
    <Router>
      <div style={WrappContainer}>
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
                    <Link to={`${prod.id}/description`} onClick={() => ApiCall2(prod.id)}>
                      <span style={productsList_title}>{prod.title}</span>
                    </Link>
                    <span style={productsList_state}>{prod.state_name}</span>
                  </li>
                </ul><Divider />
                <Switch>
                  <Route path={`${prod.id}/description`} children={<ProductsDetail ApiCall2={userData} />} />
                </Switch>
                
              </></>
            ))
            )) : ('')}
        </div>
      </div>
    </Router>
  );
};



// //armado de los styles
const styles = {
  WrappContainer: {
    backgroundColor: '#EEEEEE',
  },
  WrappContainer_ul: {
    backgroundColor: 'white',
    alignContent: 'center',
    maxWidth: 'max-content',
    marginLeft: '13rem',
    alignItems: 'stretch',
  },

  WrappContainerSeacr: {
    display: 'flex',
    justifyContent: 'start',
    background: '#FFE600',
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

