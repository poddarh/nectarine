import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import ABOUT from './components/about.js';
import CONTACT from './components/contact.js';
import HELP from './components/help.js';
import HOME from './components/home.js';
import INDEX from './components/index.js';
import MOBILE_CLOUD_SERVICES from './components/mobile_cloud_services.js';
import MOBILE_FILES_AND_FOLDERS from './components/mobile_files_and_folders.js';
import USER_CLOUD_SERVICES from './components/user_cloud_services.js';
import USER_PROFILE from './components/user_profile.js';

// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('about') !== null) {
  ReactDOM.render(
    <ABOUT />,
    document.getElementById('about')
  );
} else if (document.getElementById('contact') !== null) {
  ReactDOM.render(
    <CONTACT />,
    document.getElementById('contact')
  );
} else if (document.getElementById('help') !== null) {
  ReactDOM.render(
    <HELP />,
    document.getElementById('help')
  );
} else if (document.getElementById('home') !== null) {
  ReactDOM.render(
    <HOME />,
    document.getElementById('home')
  );
} else if (document.getElementById('index') !== null) {
  ReactDOM.render(
    <INDEX />,
    document.getElementById('index')
  );
} else if (document.getElementById('mobile_cloud_services') !== null) {
  ReactDOM.render(
    <MOBILE_CLOUD_SERVICES />,
    document.getElementById('mobile_cloud_services')
  );
} else if (document.getElementById('mobile_files_and_folders') !== null) {
  ReactDOM.render(
    <MOBILE_FILES_AND_FOLDERS />,
    document.getElementById('mobile_files_and_folders')
  );
} else if (document.getElementById('user_cloud_services') !== null) {
  ReactDOM.render(
    <USER_CLOUD_SERVICES />,
    document.getElementById('user_cloud_services')
  );
} else if (document.getElementById('user_profile') !== null) {
  ReactDOM.render(
    <USER_PROFILE />,
    document.getElementById('user_profile')
  );
}
