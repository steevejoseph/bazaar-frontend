import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import './style/index.css';

import Navbar from './components/navbar';
import CreateService from './components/create_service';
import Home from './components/home';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Navbar loggedIn={false}/>
                <Switch>
                    <Route path="/service/:id" />
                    <Route path="/account" />
                    <Route path="/create-service" component={CreateService} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));