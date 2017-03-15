import React from 'react';
import ReactDOM from 'react-dom';

// Each major browser view user interface must be imported.
import About from './components/about.js';
import Contact from './components/contact.js';

// For each view conditionally determine which view to display
// depending on if the ID is present in the HTML.
if (document.getElementById('about-div') !== null) {
  ReactDOM.render(
    <About />,
    document.getElementById('about-div')
  );
} else if (document.getElementById('contact-div') !== null) {
  ReactDOM.render(
    <Contact />,
    document.getElementById('contact-div')
  );
}

// IGNORE NEXT LINE -> Added just to avoid the error message: "React" is defined but never used
React.isValidElement(null);
