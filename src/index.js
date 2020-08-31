import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';



// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMovies)
    yield takeEvery('GET_DETAILS', fetchDetails)
    yield takeEvery('ADD_MOVIE', postMovie)
    yield takeEvery('SUBMIT_EDITED_MOVIE', postEdit)
    yield takeEvery('GENRE_SEARCH', fetchSearchResults)
    yield takeEvery('TITLE_SEARCH', fetchTitleResults)
}

//saga generator functions
function* fetchTitleResults(action) {
    try {
        let response = yield axios.get(`/api/search/${action.payload}`);
        console.log(response.data)
        yield put({type: 'SET_SEARCH', payload: response.data})
    } catch (error) {
        console.log('error in fetchSearchResults', error)
    }
}



function* fetchSearchResults(action) {
    try {
        let response = yield axios.get(`/api/search/${action.payload}`);
        console.log(response)
        yield put({type: 'SET_SEARCH', payload: response.data})
    } catch (error) {
        console.log('error in fetchSearchResults', error)
    }
}




function* postEdit(action) {
    try {
        yield axios.put('/api/movie/', action.payload)
    } catch (error) {
        console.log('error in postEdit', error)
    }
}


function* postMovie(action) {
    try {
        console.log(action.payload)
        yield axios.post('/api/movie', action.payload);
        yield put({type: 'FETCH_MOVIES'})
    } catch(error) {
        console.log('error in postMovie', error)
    }
}



function* fetchDetails(action) {
    try {
        console.log('fetchDetails, id: ', action.payload)
        let response = yield axios.get(`/api/movie/${action.payload}`)
        console.log(response.data)
        //save to redux
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('error in fetch details', error);
    }
}


function* fetchMovies() {
    try {
        //server req
        let response = yield axios.get('/api/movie')
        //save to redux
        yield put({ type: 'SET_MOVIES', payload: response.data })
    } catch (error) {
        console.log('error in fetch movies', error)
    }

}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const details = (state = [], action) => {
    switch (action.type) {
        // case 'SEND_ID':
        //     console.log(action.payload)
        //     id = action.payload
        //     return state;
        case 'SET_DETAILS':
            console.log(action.payload)
            return action.payload
        default:
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//used to store search results
const searchResults = (state=[], action) => {
    if(action.type === 'SET_SEARCH') {
        return action.payload
    }

    return state
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        searchResults
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
