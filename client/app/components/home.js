import React from 'react';

export default class Home extends React.Component {

	render() {
		return (
      <div>
          <div className="col-md-7 myfiles-qr-code-column">
            <img src="/img/sample-qr-code.png" alt="QR Code" />
          </div>
          <div className="col-md-5 myfiles-qr-code-sidetext"><span>Scan this QR code to view file.</span></div>
      </div>
		)
	}
}
