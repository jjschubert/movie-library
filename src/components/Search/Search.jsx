import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputLabel, MenuItem, Select, TextField, FormControl, Button, Typography, Card } from '@material-ui/core';
import './Search.css'

class Search extends Component {

    state = {
        genre_id: '',
        title: '',
    }

    //sends genre query to index.js
    genreSearch = () => {
        console.log(this.state)
        this.props.dispatch({ type: 'GENRE_SEARCH', payload: this.state.genre_id })
        this.setState({
            genre_id: '',
            title: '',
        })
    }

    //sends title query to index.js
    titleSearch = () => {
        console.log(this.state)
        this.props.dispatch({ type: 'TITLE_SEARCH', payload: this.state.title})
        this.setState({
            genre_id: '',
            title: '',
        })
    }


    //tracks form changes
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }


    render() {

const searchResults = this.props.reduxState.searchResults[0] ? (
    <div className='container'>
    {this.props.reduxState.searchResults.map((movie) => (
        <Card key={movie.id} className='item' style={{ background: 'white' }}>
        <div className='card-content'>
            <img className ='poster' src={movie.poster} alt={movie.title} />
            <div className='title-div'>
                <Typography variant="h4">{movie.title}</Typography>
            </div>
            <Typography variant="body1">{movie.description}</Typography>
        </div>
        </Card>
        
    ))}  
    </div>) : (<Typography>No results matching your search</Typography>)


        return (
            <>
            <div className='addMovie'>
                <Card className='add'>
                <Typography variant='h4'>Find a Movie</Typography>
                <Typography>Search by title or genre</Typography>
                <div >
                        <div className='form-div'>
                            <TextField variant="outlined" label='Movie Title' onChange={(event) => this.handleChange(event, 'title')} />
                            <Button type='submit' variant="contained" onClick={this.titleSearch} style={{ background: '#ffddd2' }}>Search by Title</Button>
                        </div>
                        <div className='form-div'>
                        </div>
                        <div className='form-div'>
                        <FormControl>
                            <InputLabel id='genre-select'>Genre</InputLabel>
                            <Select value={this.state.genre_id} labelid='genre-select' id="genre" style={{ width: 200 }}
                                placeholder='Genre' onChange={(event) => this.handleChange(event, 'genre_id')} >
                                <MenuItem value={1}>Adventure</MenuItem>
                                <MenuItem value={2}>Animated</MenuItem>
                                <MenuItem value={3}>Biographical</MenuItem>
                                <MenuItem value={4}>Comedy</MenuItem>
                                <MenuItem value={5}>Disaster</MenuItem>
                                <MenuItem value={6}>Drama</MenuItem>
                                <MenuItem value={7}>Epic</MenuItem>
                                <MenuItem value={8}>Fantasy</MenuItem>
                                <MenuItem value={9}>Musical</MenuItem>
                                <MenuItem value={10}>Romantic</MenuItem>
                                <MenuItem value={11}>Science Fiction</MenuItem>
                                <MenuItem value={12}>Space-Opera</MenuItem>
                                <MenuItem value={13}>Superhero</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type='submit' onClick={this.genreSearch} variant="contained" style={{ background: '#ffddd2' }}>Search by Genre</Button>
                        
                        </div>
                    <Button variant="contained"  onClick={() => this.props.history.push('/')}>Cancel</Button>
                </div>
                </Card>
            </div>

            <div>
                {searchResults}
            </div> 
            </>

        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(Search)