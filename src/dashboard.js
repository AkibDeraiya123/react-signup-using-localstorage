import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
	componentWillMount() {
        document.body.style.backgroundColor = "white";
		if (localStorage.isLogin === 'false' || Object.keys(localStorage).length === 0) {
			 browserHistory.push('/login');
		}
	}
	render() {
		return(
			<MuiThemeProvider>
				<div style={{width: '100%', margin: '5% auto'}}>
    			<div style={{textAlign: 'center', marginTop: '10px'}}>
    				<RaisedButton 
    					label="Profile" 
    					style={{margin: '10px'}}
    					onClick={(e) => { 
    						browserHistory.push('/profile');
    					}} 
    					secondary={true} />
    				<RaisedButton 
    					label="logout" 
    					onClick={(e) => {
    					localStorage.setItem('isLogin',false); 
    					browserHistory.push('/login');}} 
    					secondary={true} />
    				<br />
    				Welcome To dashboard
    			</div>
				</div>
			</MuiThemeProvider>	
		)
	}	
}

export default App;
