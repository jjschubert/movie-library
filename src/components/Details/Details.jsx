import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    state = {}


    componentDidMount() {
        this.props.dispatch({ type: 'GET_DETAILS' })
    }

    render() {

        return (
            <>
                <h2>Details</h2>
        {this.props.reduxState.details[0] && 
        <div className='details'>
            <img src={this.props.reduxState.details[0].poster} alt={this.props.reduxState.details[0].title} />
        <h3>{this.props.reduxState.details[0].title}</h3>
        <h4>Categories:</h4>
        <ul>
            {this.props.reduxState.details.map((item) => {
                return (
                    <li>{item.name}</li>
                )
            })}


        </ul>
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