import React from 'react';
import {Link} from 'react-router';
import {resetDatabase} from '../database.js';

export default class Body extends React.Component {

  isCurrentPage (uri) {
    return this.props.location.pathname == uri;
  }

  getTopNavbarButton (href, name) {
    let selected = this.isCurrentPage (href);
    return (
      <Link to={ href } className={ "btn btn-default app-font" + (selected ? " myfiles-top-navbar-btn-selected" : "") }>
        <span className="glyphicon glyphicon-info-sign glyphicon-lg"></span>
        { name }
      </Link>
    );
  }

  getLeftNavbarButton (href, name, icon) {
    let selected = this.isCurrentPage (href);
    return (
      <li>
        <Link to={ href } className={ selected ? "myfiles-left-sidebar-selected" : "" }>
          <span className={ icon }></span>
          { name }
          { selected ? <span className="glyphicon glyphicon-chevron-right pull-right"></span> : null }
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top myfiles-top-sidebar">
          <div className="navbar-right" role="toolbar">
            { this.getTopNavbarButton ("/about", "About Us") }
            { this.getTopNavbarButton ("/contact", "Contact") }
            { this.getTopNavbarButton ("/help", "How To") }
          </div>
        </nav>

        <div className="navbar-fixed-left">

          <div className="myfiles-title-logo">
            <a className="navbar-brand">
              <span className="glyphicon glyphicon-qrcode"></span>
            </a>
            <p className="myfiles-title">myfiles.io</p>
          </div>

          <div className="myfiles-left-sidebar app-font">
            <div className="row">
              <ul className="nav nav-pills nav-stacked">
                { this.getLeftNavbarButton ("/", "Home", "glyphicon glyphicon-home glyphicon-lg") }
                { this.getLeftNavbarButton ("/user_profile", "Profile", "glyphicon glyphicon-user glyphicon-lg") }
                { this.getLeftNavbarButton ("/user_cloud_services", "Cloud Services", "glyphicon glyphicon-hdd glyphicon-lg") }
                <li>
                  <a onClick={() => {
                      resetDatabase();
                      window.alert("Database reset! Refreshing the page now...");
                      document.location.reload(false);
                    }}>
                    <span className="glyphicon glyphicon-floppy-remove glyphicon-lg"></span>
                    Reset Mock DB
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="container myfiles-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}
