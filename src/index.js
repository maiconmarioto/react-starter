import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import { Link, Route, HashRouter, IndexRoute } from 'react-router-dom'
import asyncComponent from './utils/asyncComponent';

import App from './components/App';
import Home from './components/Home'

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  logger, ReduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);

const Foo = asyncComponent(() => import(/* webpackChunkName: "foozin" */ './components/Foo').then(module => module.default))
const Bar = asyncComponent(() => import(/* webpackChunkName: "barzin" */ './components//Bar').then(module => module.default))


render(
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route path="/" exact  component={App} />
        <Route path="/" exact  component={Home} />
        <Route path="/foo" exact  component={Foo} />
        <Route path="/bar" exact  component={Bar} />
      </div>
    </HashRouter>
  </Provider>
  , document.getElementById('root'))
