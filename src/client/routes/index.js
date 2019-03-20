/* eslint-disable */ // Identifer is not in camel case 

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import D3_BarChart from '../pages/d3/barchart';
import D3_PieChart from '../pages/d3/piechart';
import D3Canvas from '../pages/d3/d3_canvas';
import Three from '../pages/three';
import error from '../pages/404notfound';
import Layout from '../layout';
import ReCharts_Basic from '../pages/recharts/basic';
import ReCharts_LineChart from '../pages/recharts/linechart';
import ReCharts_BarChart from '../pages/recharts/barchart';
import ReCharts_AreaChart from '../pages/recharts/areachart';
import ReCharts_PieChart from '../pages/recharts/piechart';
import ReCharts_RadarChart from '../pages/recharts/radarchart';
import ReCharts_Others from '../pages/recharts/others';

const Routers = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={D3_BarChart} />
        <Route exact path="/d3/barchart" component={D3_BarChart} />
        <Route exact path="/d3/piechart" component={D3_PieChart} />
        <Route exact path="/d3/canvas" component={D3Canvas} />
        <Route exact path="/three/basic" component={Three} />
        <Route exact path="/recharts/basic" component={ReCharts_Basic} />
        <Route exact path="/recharts/linechart" component={ReCharts_LineChart} />
        <Route exact path="/recharts/barchart" component={ReCharts_BarChart} />
        <Route exact path="/recharts/areachart" component={ReCharts_AreaChart} />
        <Route exact path="/recharts/piechart" component={ReCharts_PieChart} />
        <Route exact path="/recharts/radarchart" component={ReCharts_RadarChart} />
        <Route exact path="/recharts/others" component={ReCharts_Others} />
        <Route component={error} />
      </Switch>
    </Layout>
  </Router>
)

export default Routers;
