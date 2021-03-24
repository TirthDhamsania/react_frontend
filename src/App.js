import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Create from "./Create";
import View from "./View";

const App = () => {
	return (
		<div>
			<Router>
				<div className="main_page">
				<Link to="create">
					<button id="create_button">Create</button>
				</Link>
				<Link to="view">
					<button id="view_button">View</button>
				</Link>
				</div>
				<Switch>
					<Route exact path="/create">
						<Create />
					</Route>
					<Route exact path="/view">
						<View />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
