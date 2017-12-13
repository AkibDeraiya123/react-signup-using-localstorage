import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { browserHistory } from 'react-router';

class Dashboard extends Component {
	constructor() {
    super();
		this.state = {
			fixedHeader: true,
			showCheckboxes: false,
		};

		this.logout = this.logout.bind(this);
	}
	componentWillMount() {
		if (localStorage.isLogin === 'false' || Object.keys(localStorage).length === 0) {
			 browserHistory.push('/login');
		}
	}
	logout() {
		localStorage.setItem('isLogin',false);
    browserHistory.push('/login');

	}
  render() {
    return (
      <MuiThemeProvider>
	      <div style={{width: '100%', margin: '5% auto'}}>
    			<div style={{textAlign: 'center', marginTop: '10px'}}>
	    			<RaisedButton 
	    					label="Go Dashboard" 
	    					style={{margin: '10px'}}
	    					onClick={(e) => { 
	    					browserHistory.push('/dashboard');}} 
	    					secondary={true} />
    				<RaisedButton label="logout" onClick={this.logout} secondary={true} />
    			</div>
    			<Table
    				fixedHeader={this.state.fixedHeader}
    				style={{marginTop: '10px'}}
    			>
    				<TableHeader
	    				adjustForCheckbox={this.state.showCheckboxes}
    					displaySelectAll={this.state.showCheckboxes}
    					style={{color: 'gray'}}
    				>
		          <TableRow>
		            <TableRowColumn>Firstname</TableRowColumn>
		            <TableRowColumn>Lastname</TableRowColumn>
		            <TableRowColumn>Email</TableRowColumn>
		            <TableRowColumn>Photo</TableRowColumn>
		          </TableRow>
		        </TableHeader>
		        
		        <TableBody
		        	displayRowCheckbox={this.state.showCheckboxes}
		        >
		        	<TableRow>
			        	<TableRowColumn>{localStorage.getItem('firstname')}</TableRowColumn>
			        	<TableRowColumn>{localStorage.getItem('lastname')}</TableRowColumn>
		            <TableRowColumn>{localStorage.getItem('email')}</TableRowColumn>
		            <TableRowColumn>image display here</TableRowColumn>
		          </TableRow>
		        </TableBody>
	      	</Table>
	      </div>
      </MuiThemeProvider>
    )
	}
}

export default Dashboard;