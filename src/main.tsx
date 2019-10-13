import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { Root } from './app';
import client from 'app/gql/client';

// prepare store
const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Root />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
