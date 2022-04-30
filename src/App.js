import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import Header from './layout/Header';
import theme from './config/theme';
import './index.css';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import LikePosts from './containers/LikePosts';
import Admin from './containers/Admin';

const App = () => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route path="/like-posts" component={LikePosts} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;