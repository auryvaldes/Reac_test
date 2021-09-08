import React, { useState } from 'react';

import logo from '../image/logo.png'

const ProductsPage = () => {
  const { searchBar, WrappContainer, logoMeli, lupaSearch } = styles;

  const [persistFound, setpersistFound] = useState("");
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
    <div>
    <div style={WrappContainer}>
      <img style={logoMeli} src={logo} alt="" />
      <input style={searchBar}
        type="search"
        value={persistFound}
        onChange={(e) => setpersistFound(e.target.value)}
        className="input"
        placeholder="Filter" />
      <icon onClick={() => ApiCall(persistFound)} style={lupaSearch} />
    </div>
    <div className="user-list">
      {foundproducts && foundproducts.items.length > 0 ? (
        foundproducts.items.map((prod => (
          <li key={prod.id} className="prod">
            <span>{prod.title}</span>
            <span >{prod.picture}</span>
          </li>
        ))
        )) : (
        <h1>No results found!</h1>
      )}
    </div>
    </div>
  );
};

const styles = {
  searchBar: {
    width: "80%",
    border: "none",
    padding: "0.5rem",
    marginTop: "0.3rem",
    marginBottom: "0.3rem",
    borderTopLeftRadius: "0.3rem",
    borderBottomLeftRadius: "0.3rem",
    marginLeft: "1rem",

  },
  WrappContainer: {
    display: "flex",
    justifyContent: "start",
    background: "#FFE600",
  },
  logoMeli: {
    marginLeft: "6rem",
    padding: "0.3rem",
    width: "3rem",
  },
  lupaSearch: {
    background: "#EEEEEE",
    width: "2rem",
    marginTop: "0.3rem",
    marginBottom: "0.3rem",
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem",
  }
};

export default ProductsPage;