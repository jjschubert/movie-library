import React, { Component } from 'react';
import { connect } from 'react-redux';


class Details extends Component {

    


    render() {
        return (
            <>
          <p>details page</p>
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