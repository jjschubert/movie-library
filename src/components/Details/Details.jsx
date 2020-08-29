import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Details.css';
import {Card, Button, Typography} from '@material-ui/core/';
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
            <Typography variant='h4'>{this.props.reduxState.details[0].title}</Typography>
            <img src={this.props.reduxState.details[0].poster} alt={this.props.reduxState.details[0].title} />
        
        <div className='categories'>
            <Typography variant='h5'>Categories:</Typography>
        <ul>
            {this.props.reduxState.details.map((item) => {
                return (
                    <Typography variant='h6'><li key={item.name}>{item.name}</li></Typography>
                    
                )
            })}
        </ul>
        </div>
        <Typography variant='body1' className='categories'>{this.props.reduxState.details[0].description}</Typography>  
              <Button variant='contained' style={{ background: '#ffddd2' }} onClick={() => this.props.history.push('/')}>Back</Button>
              <Link className='editLink' to={`/edit/${id}`}>
              <Button variant='contained' style={{ background: '#ffddd2' }}>Edit</Button>
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