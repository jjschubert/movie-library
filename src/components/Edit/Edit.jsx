import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, FormControl, FormHelperText, Button, Card } from '@material-ui/core';

class Edit extends Component {

    state = {
        title: this.props.reduxState.details[0].title,
        description: this.props.reduxState.details[0].description,
        id: this.props.reduxState.details[0].id
    }
    submitEditedMovie = (event) => {
        event.preventDefault();
        console.log(this.state)
        // this.props.dispatch({ type: 'ADD_MOVIE', payload: this.state })
    }

    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
            id: this.props.reduxState.details[0].id
        })
    }
    //     details reducer 
    //     0:
    // description: "Avatar (marketed as James Cameron's Avatar) is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron, and stars Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature superconductor. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi – a humanoid species indigenous to Pandora. The film's title refers to a genetically engineered Na'vi body operated from the brain of a remotely located human that is used to interact with the natives of Pandora."
    // id: 1
    // name: "Fantasy"
    // poster: "images/avatar.jpeg"
    // title: "Avatar"

    render() {

        console.log(this.state)

        return (
            <Card>
                <p>Edit</p>
                <form onSubmit={this.submitEditedMovie}>
                    <TextField variant="outlined" label='Title' defaultValue={this.props.reduxState.details[0].title}
                        required onChange={(event) => this.handleChange(event, 'title')} />
                    <TextField variant="outlined" label='Description' required multiline style={{ width: 500 }}
                        defaultValue={this.props.reduxState.details[0].description}
                        onChange={(event) => this.handleChange(event, 'description')} />
                    <Button variant='contained' type='submit'>Submit</Button>
                </form>
            </Card>
        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(Edit)