/**
 * @file routes.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from 'dva/router';

import Frame from './layouts/Frame';

import Test from './views/test/Home';
import Work from './views/work/Work';
import TestDetail from './views/test/Detail';
import Tset1 from './common/layout';


const routes = ({ history }) => (// eslint-disable-line
  <Router history={history}>
    <Route path="/" component={Frame}>
      <IndexRedirect to="/dashboard/analysis" />
      <Route path="dashboard/analysis">
        <IndexRoute component={Test} />
        <Route path="detail/:id" component={TestDetail} />
      </Route>
      <Route path="form/work" component={Work}>
        {/*<IndexRoute component={Work} />*/}
      </Route>
    </Route>
  </Router>
);

export default routes;
