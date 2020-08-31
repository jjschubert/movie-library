import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList.jsx'
import Details from '../Details/Details.jsx'
import AddMovies from '../AddMovies/AddMovies.jsx';
import AppBar from '@material-ui/core/AppBar';
import Edit from '../Edit/Edit.jsx';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Search from '../Search/Search.jsx'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <AppBar position="static" className="App-header" style={{ background: '#006d77' }}>
          <header >
            <Typography variant="h3" className="App-title" style={{ color: 'white' }}>Movie Library</Typography>
            <ul className='nav'>
              <li><Link to="/add">Add a Movie</Link></li>
              <li><Link to="/search">Search Library</Link></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </header>
        </AppBar>

        <Route exact path="/" component={MovieList} />
        <Route exact path="/details/:movie_id" component={Details} />
        <Route path='/add' component={AddMovies} />
        <Route path='/edit/:movie_id' component={Edit}/>
        <Route path='/search' component={Search}/>
      </Router>
    );
  }
}

export default App;
