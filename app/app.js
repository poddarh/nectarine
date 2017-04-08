import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

// Each major browser view user interface must be imported.
import About from './components/about.js';
import Body from './components/body.js';
import Contact from './components/contact.js';
import Help from './components/help.js';
import Home from './components/home.js';
import MobileCloudServices from './components/mobile_cloud_services.js';
import MobileFilesAndFolder from './components/mobile_files_and_folders.js';
import UserCloudServices from './components/user_cloud_services.js';
import UserProfile from './components/user_profile.js';

class MobileApp extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class WebApp extends React.Component {
  render() {
    return (
      <Body location={this.props.location}>
        {this.props.children}
      </Body>
    )
  }
}

if (document.getElementById('web-wrapper') !== null) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={WebApp}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="contact" component={Contact} />
        <Route path="help" component={Help} />
        <Route path="user_cloud_services" component={UserCloudServices} />
        <Route path="user_profile" component={UserProfile} />
      </Route>
    </Router>
  ),document.getElementById('web-wrapper'));
} else if (document.getElementById('mobile-wrapper') !== null) {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={MobileApp}>
        <IndexRoute component={MobileCloudServices} />
        <Route path="files_and_folders" component={MobileFilesAndFolder} />
      </Route>
    </Router>
  ),document.getElementById('mobile-wrapper'));
}

// IGNORE NEXT LINE -> Added just to avoid the error message: "React" is defined but never used
React.isValidElement(null);
