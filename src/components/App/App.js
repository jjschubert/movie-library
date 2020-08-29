import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList.jsx'
import Details from '../Details/Details.jsx'
import AddMovies from '../AddMovies/AddMovies.jsx';
import AppBar from '@material-ui/core/AppBar';
import Edit from '../Edit/Edit.jsx';
import Detail from '../Details/Detail.jsx'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <AppBar position="static" className="App-header" style={{ background: '#658e9c' }}>
          <header >
            <h1 className="App-title">Movies!</h1>
            <ul className='nav'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add a Movie</Link></li>
            </ul>
          </header>
        </AppBar>

        <Route exact path="/" component={MovieList} />
        <Route exact path="/details/:movie_id" component={Details} />
        {/* <Route exact path="/detail/:id" component={Detail} /> test code - delete when donw*/}
        <Route path='/add' component={AddMovies} />
        <Route path='/edit' component={Edit}/>
      </Router>
    );
  }
}

export default App;
