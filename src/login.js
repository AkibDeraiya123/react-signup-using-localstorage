import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router'

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      openSnackbar: false,
      SnackbarMsg: '',
    };
    this.checkData = this.checkData.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

  }

  componentWillMount() {
    document.body.style.backgroundColor = "#03A9F4";
  }

  checkData() {
    // eslint-disable-next-line
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (this.state.email.trim() === '') {
      this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Email' });
    } else if (!emailRegex.test(this.state.email)) {
      this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Valid E-Mail' });
    } else if (this.state.password.trim() === '') {
      this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Password' });
    } else {
      if (localStorage.email === this.state.email && localStorage.password === this.state.password) {
        localStorage.setItem('isLogin', 'true');
        browserHistory.push('/dashboard');
      } else {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Your E-Mail/Password Wrong' });
      }
    }
  }

  handleRequestClose() {
    this.setState({
      openSnackbar: false,
      SnackbarMsg: '',
    });
  };

  render() {
    const styleb = {
      width: '100%', 
      textAlign: 'center' 
    };
    return (
      <MuiThemeProvider>
        <div style={styleb}>

          <Snackbar
            style={{ top: 0,
              bottom: 'auto',
              float: 'right'
            }}
            open={this.state.openSnackbar}
            message={this.state.SnackbarMsg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />

          <Paper style={{margin: "10% 0% 0% 25%", width: '50%'}}>
            <div style={{padding: '1px 0px 10px 0px'}}>
              <h1 color="accent"> Login</h1>
              <TextField
                id="email"
                label="E-Mail"
                floatingLabelText="E-Mail"
                value={this.state.email}
                onChange={event => this.setState({ email: event.target.value })}
                style={{width: '85%'}}
              /> <br />
              <TextField
                id="password"
                label="Password"
                floatingLabelText="Password"
                type="password"
                value={this.state.password}
                onChange={event => this.setState({ password: event.target.value })}
                style={{width: '85%'}}
              /> <br/>
              <div style={{textAlign: 'center', margin: '10px'}}>
                <RaisedButton label="Submit" primary={true} onClick={this.checkData} />
              </div>
              <div style={{textAlign: 'center', cursor: 'pointer', color: 'red', marginTop: '20px'}} onClick={((e) => {browserHistory.push('/')})}>
                Not Registre?
              </div>
            </div>
        </Paper>
        </div>
        </MuiThemeProvider>
      )
  }
}
