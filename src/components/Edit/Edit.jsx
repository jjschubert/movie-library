import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Card, Typography } from '@material-ui/core';
import './Edit.css';
import axios from 'axios';

class Edit extends Component {

    state = {
        editMovie: {
            title: null,
            description: null,
            id: this.props.match.params.movie_id
        }
    }

    //new server request so we can use state to populate the form
    componentDidMount() {
        axios.get(`/api/movie/${this.props.match.params.movie_id}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                editMovie: {
                    ...this.state.editMovie,
                    title: res.data[0].title,
                    description: res.data[0].description,
                }
            })
            console.log('state updated', this.state)
        })
    }

//submits form, sends updated editMovie
    submitEditedMovie = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.props.dispatch({ type: 'SUBMIT_EDITED_MOVIE', payload: this.state.editMovie })
        this.props.history.push('/');
    }

    //handles form inputs
    handleChange = (event, propertyName) => {
        this.setState({
            editMovie: {
            ...this.state.editMovie,
            [propertyName]: event.target.value,
            }
        })
    }

    render() {
        let id = this.props.match.params.movie_id;
        console.log(this.state)
        console.log(id)

        //card saved in variable for conditional render
        const detailCard = this.state.editMovie.title ? ( 
            <Card className='edit'>
                        <Typography variant='h4'>Edit Movie</Typography>
                        <form onSubmit={this.submitEditedMovie}>
                            <div className='formDiv'>
                                <TextField variant="outlined" label='Title' defaultValue={this.state.editMovie.title} 
                                    required onChange={(event) => this.handleChange(event, 'title')} />
                            </div>
                            <div>
                                <TextField variant="outlined" label='Description' required multiline style={{ width: 500 }}
                                    defaultValue={this.state.editMovie.description}
                                    onChange={(event) => this.handleChange(event, 'description')} />
                            </div>
                            
                            <Button variant='contained' onClick={() => this.props.history.push('/')}>Cancel</Button>
                            <Button variant='contained' style={{ background: '#ffddd2' }} type='submit'>Save</Button>
                        </form>

                    </Card>)
            : (<p>Error</p>)


        return (
            <div className='container'>
                {detailCard}
            </div>
        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(Edit)