import React from 'react';
import Body from './body.js';

export default class About extends React.Component {

	render() {
		return (
			<Body>
				<h1>Nectarine</h1>
				<div className="row">
					<div className="col-md-6">
						<h5>The Group that Could</h5>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 imgAbt">
						<img src="img/nectarine.jpg" alt="Our Group" className="img-thumbnail" />
					</div>
					<div className="col-md-8 ">
						<p className="text-center"> Here is a huge paragraph about us. Only us. Maybe a little about this class and how it got us to do this. But mostly us. Seriously long. We have such a rich background. In experience, not money. But hey I mean someday our time will come.
							This could project could be what sets us in motion to be the next quadrillionaires. Or just be a fun story to tell the kids.</p>
						<blockquote className="blockquote-reverse">
							<p>We are trending up boys! We are trending up.</p>
							<footer>T. J. Miller in <cite title="Source Title">Silicon Valley</cite></footer>
						</blockquote>
					</div>
				</div>
				<br/>
				<div className="row">
					<ul className="list-inline text-center">
						<li>Current Team: Harsh Poddar, Jackie Wang, Brian Gregg, Matthew Hinsley, Ryan Fleesher, and Cameron Pavao</li>
					</ul>
				</div>
			</Body>
		)
	}
}