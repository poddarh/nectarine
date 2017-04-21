import React from 'react';
import Peer from 'peerjs';
import QRCode from 'qrcode';

/*eslint no-console: 0 */

export default class Home extends React.Component {

	makePeer(peer) {
		if (peer != null) {
			peer.destroy();
		}
		peer = new Peer({key: 'lwjd5qra8257b9'});
		peer.on('open', function(id) {
			console.log('My peer ID is: ' + id);

			var canvas = document.getElementById('canvas')
			QRCode.toCanvas(canvas, id, {
				scale: 15,
				margin: 2
			}, function (error) {
				if (error) console.error(error)
			})

			peer.on('connection', function(conn) {
				conn.on('open', function() {
					conn.on('data', function(data) {
						conn.send({success: true});
						peer.destroy();
						window.location.href = data.url;
					});
				});
			});
		});
		return peer;
	}

	startListening() {
		var peer = this.makePeer(null);
		window.setInterval(() => peer = this.makePeer(peer), 30000);
	}

	render() {
		this.startListening();
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
