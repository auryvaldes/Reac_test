import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import SearchBar from './Components/SearchBar'
import ProductsPage from './Components/ProductsPage'
import ProductsDetail from './Components/ProductsDetail'


const Home = props => (
  <ProductsPage />
)

const Users = ({ match }) => (
  <ProductsDetail />
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SearchBar />
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route exact strict  component={Users} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;