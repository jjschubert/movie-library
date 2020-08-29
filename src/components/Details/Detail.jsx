import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Details.css';



class Details extends Component {

    state = {
        id: null
    }

    componentDidMount() {
        console.log(this.props)
        let id = this.props.match.params.id
        this.setState({id: id})
    }
  
    render() {

        return (
            <div className='container'>
                
              
            <p>route param</p>
            <p>{this.state.id}</p>
            </div>

        )
    }
};

const mapPropsToState = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapPropsToState)(Details)