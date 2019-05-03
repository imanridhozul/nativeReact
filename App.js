import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './components/Home';
import Greet from './components/Greet';

export default class App extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="home" component={Home} title="Login" initial={true}/>
			      <Scene key="greet" component={Greet} title="greet"/>
			    </Stack>
			 </Router>
			)
	}
}