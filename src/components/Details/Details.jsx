import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    state = {}


    componentDidMount() {
        this.props.dispatch({ type: 'GET_DETAILS' })
    }

    render() {

//         details: Array(1)
// 0:
// description: "Avatar (marketed as James Cameron's Avatar) is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron, and stars Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature superconductor. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi – a humanoid species indigenous to Pandora. The film's title refers to a genetically engineered Na'vi body operated from the brain of a remotely located human that is used to interact with the natives of Pandora."
// id: 1
// name: "Fantasy"
// poster: "images/avatar.jpeg"
// title: "Avatar
        return (
            <>
                <h2>Details</h2>
        {this.props.reduxState.details[0] && 
        <div className='details'>
            <img src={this.props.reduxState.details[0].poster} alt={this.props.reduxState.details[0].title} />
        <h3>{this.props.reduxState.details[0].title}</h3>
        <h4>Categories: {this.props.reduxState.details[0].name}</h4>
        <p>{this.props.reduxState.details[0].description}</p>
        </div>}
        
                <button onClick={() => this.props.history.push('/')}>Back</button>
            </>

        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(Details)