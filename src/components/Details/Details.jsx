import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Details.css';
import {Card, Button} from '@material-ui/core/';
import {  Link } from 'react-router-dom';

class Details extends Component {


    //gets details based on params
    componentDidMount() {
        let id = this.props.match.params.movie_id
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
    }

    render() {
        let id = this.props.match.params.movie_id;
        console.log(id)

        return (
            <div className='container'>
                
            {/* conditional render once redux is ready */}
        {this.props.reduxState.details[0] && 
        <Card className='details'>
            <h2>{this.props.reduxState.details[0].title}</h2>
            <img src={this.props.reduxState.details[0].poster} alt={this.props.reduxState.details[0].title} />
        
        <div className='categories'>
        <h4 >Categories:</h4>
        <ul>
            {this.props.reduxState.details.map((item) => {
                return (
                    <li key={item.name}>{item.name}</li>
                )
            })}
        </ul>
        </div>
        <p className='categories'>{this.props.reduxState.details[0].description}</p>
        
              <Button variant='contained' onClick={() => this.props.history.push('/')}>Back</Button>
              <Link to={`/edit/${id}`}>
              <Button variant='contained'>Edit</Button>
              </Link>
                </Card>}
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