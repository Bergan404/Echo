import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import session from './session'
import servers from './servers'
import server from './server'
import channels from './channels'

import messages from './messages'
import serverUsers from './serverUsers'
import create from './server_create'
import privateMessages from './privateMessages'
import privateMessageRecipients from './privateMessageRecipients'



const rootReducer = combineReducers({
    session,
    servers,
    server,
    channels,
    messages,
    serverUsers,
    create,
    privateMessages,
    privateMessageRecipients

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
