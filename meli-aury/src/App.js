import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SearchBar from './Components/SearchBar'
import ProductsPage from './Components/ProductsPage'
import ProductsDetail from './Components/ProductsDetail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SearchBar />
        <div>
          <Switch>
            <Route exact path="/" component={ProductsPage} />
            <Route
              exact
              path="/:id/description"
              component={ProductsDetail}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import SearchBar from './Components/SearchBar'
// import ProductsPage from './Components/ProductsPage'
// import ProductsDetail from './Components/ProductsDetail'


// const Home = props => (
//   <ProductsPage />
// )

// const Users = props => (
//   <ProductsDetail />
// )

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//         <SearchBar />
//         <Switch>
//           <Route exact strict path="/" component={Home} />
//           <Route exact strict path="/:id/description" component={Users} />
//         </Switch>
//       </BrowserRouter>
//     )
//   }
// }

// export default App;