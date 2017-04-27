import React from 'react';
import QRCode from 'qrcode';
import io from 'socket.io-client';

/*eslint no-console: 0 */

export default class Home extends React.Component {

	constructor() {
		super();
		this.port = location.port ? parseInt(location.port) : (location.protocol == "https:" ? 443 : 80);
		this.host = location.hostname;
	}

	makeSocket() {
		var socket = io.connect('/');
		socket.on('message', function (data, awk) {
			console.log(data);
			if (data.action == 'init') {
				console.log("Socket ID: "+ socket.id);
				var canvas = document.getElementById('canvas')
				QRCode.toCanvas(canvas, socket.id, {
					scale: 15,
					margin: 2
				}, function (error) {
					if (error) console.error(error)
				})
			} else if (data.action == 'url') {
				console.log(data);
				awk({ success: true });
				socket.close();
				window.location.href = data.url;
			}
		});
	}

	componentDidMount() {
		this.makeSocket();
		this.interval = window.setInterval(() => this.makeSocket(), 30000);
	}

	componentWillUnmount() {
		if (this.interval){
			clearInterval(this.interval);
		}
	}

	render() {
		return (
      <div>
          <div className="col-md-7 myfiles-qr-code-column">
            <canvas id="canvas"></canvas>
          </div>
          <div className="col-md-5 myfiles-qr-code-sidetext"><span>Scan this QR code to view file.</span></div>
      </div>
		)
	}
}
