import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import './MovieList.css'
import {  Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

class MovieList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' })
    }

    render() {
        return (
            <div className='container'>
                {this.props.reduxState.movies.map((movie) => (
                    <Card key={movie.id} className='item' style={{ background: 'white' }}>
                    <div className='card-content'>
                        <Link to={`/details/` + movie.id}>
                        <img className ='poster' src={movie.poster} alt={movie.title} />
                        </Link>
                        <div className='title-div'>
                            <Typography variant="h4">{movie.title}</Typography>
                        </div>
                        <Typography variant="body1">{movie.description}</Typography>
                    </div>
                    </Card>
                ))}
            </div>
        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(MovieList)