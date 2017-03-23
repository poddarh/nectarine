import React from 'react';
import Body from './body.js';

export default class Help extends React.Component {

	render() {
		return (
			<Body>
					<div className="col-md-8">
						<h1>Workflow</h1> myFiles is a platform for using your cell phone to authorize foreign devices to access your personal media
							<h3>Step 1</h3>
							Select the image you want to share, either out of your phones photo storage, or, if you are logged in, your Dropbox or Google Drive files
							<h3>Step 2</h3>
							Have the person who wishes to view your file head over to the myfiles.io homepage
							<h3>Step 3</h3>
							Use your mobile phone to scan the QR code that appears on their screen
							<h3>Step 4</h3>
							Voila! They are now permitted to view
						</div>
						<div className="col-md-4">
							<img src="img/howto.jpg" />
						</div>
				</Body>
			)
		}
	}
