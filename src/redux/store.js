import {createStore, applyMiddleware, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import {reducer} from './reducer';

/*
export let store = createStore (
    reducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

);
*/


export let store = configureStore ({
    reducer: reducer
})
