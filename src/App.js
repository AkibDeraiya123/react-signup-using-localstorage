import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      openSnackbar: false,
      SnackbarMsg: '',
      loading: false,
      finished: false,
      stepIndex: 0,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };

    this.shosnack = this.shosnack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.dummyAsync = this.dummyAsync.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.register = this.register.bind(this);
    // this.imageUpload = this.imageUpload.bind(this);
  }

  // getBase64Image(img) {
  //     var canvas = document.createElement("canvas");
  //     canvas.width = '100';
  //     canvas.height = '100';

  //     var ctx = canvas.getContext("2d");
  //     ctx.drawImage(img, 0, 0);

  //     var dataURL = canvas.toDataURL("image/png");

  //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  //   }

  // imageUpload(e) {
  //   console.log(e.target.value);
  //   const imgData = this.getBase64Image(e.target.value);
  //   console(imgData);
  // }

  componentWillMount() {
    document.body.style.backgroundColor = "#03A9F4";
  }

  register() {
    localStorage.setItem('firstname', this.state.firstname);
    localStorage.setItem('lastname', this.state.lastname);
    localStorage.setItem('email', this.state.email);
    localStorage.setItem('password', this.state.password);
    browserHistory.push('/login')
  };

  dummyAsync(cb){
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext(){
    if (this.state.stepIndex === 0) {
      if (this.state.firstname.trim() === '') {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Firstname' });
        return false;
      } else if (this.state.lastname.trim() === '') {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Lastname' });
        return false;
      }
    } else if (this.state.stepIndex === 1) {
       // eslint-disable-next-line
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (this.state.email.trim() === '') {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Enter E-Mail' });
        return false;
      } else if (!emailRegex.test(this.state.email)) {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Valid E-Mail' });
        return false;
      } else if (this.state.password.trim() === '') {
        this.setState({ openSnackbar: true, SnackbarMsg: 'Enter Password' });
        return false;
      }
    }
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  shosnack(msg) {
    return (
      <Snackbar
        open={this.state.openSnackbar}
        message='msg'
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }

  handleRequestClose() {
    this.setState({
      openSnackbar: false,
    });
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        finished: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              id="firstname"
              style={{width: "80%"}}
              name="firstname"
              value={this.state.firstname}
              onChange={(event) => this.setState({ firstname: event.target.value })}
              floatingLabelText="Firstname" />
            <br />
            <TextField
              id="lastname"
              style={{width: "80%"}}
              name="lastname"
              value={this.state.lastname}
              onChange={(event) => this.setState({ lastname: event.target.value })}
              floatingLabelText="Lastname" />
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              id="email"
              name="email"
              style={{width: "80%"}}
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
              floatingLabelText="E-Mail" />
            <br />
            <TextField
              id="password"
              name="password"
              style={{width: "80%"}}
              type='password'
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
              floatingLabelText="Password" />
          </div>
        );
      case 2:
        return (
          <p>
           {/*<form encType="multipart/form-data">
              <input 
                type="file" 
                id="imageFile" 
                name='imageFile' 
                onChange={this.imageUpload} />
            </form>*/}
            Image Upload Here
          </p>
        );
        case 3:
        return (
          <p>
            You have entered Data is<br/>
            Firstname: {this.state.firstname} <br/>
            Lastname: {this.state.lastname} <br/>
            Email: {this.state.email} <br/>
            Password: {this.state.password} <br/>
          </p>
        );
      default:
        return 'You\'re a long way from home!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{marginTop: 24, marginBottom: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label='Submit'
              primary={true}
              onClick={this.register}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{marginTop: 24, marginBottom: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label={stepIndex === 4 ? 'Submit' : 'Next'}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <MuiThemeProvider>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>

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

          <Paper style={{textAlign: 'center',}} zDepth={1} rounded={false}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Profile details</StepLabel>
              </Step>
              <Step>
                <StepLabel>login details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Image upload</StepLabel>
              </Step>
              <Step>
                <StepLabel>Confirm and Submit</StepLabel>
              </Step>
            </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
            <div   style={{color: 'blue', cursor: 'pointer', padding: '10px'}}>
              <p onClick={() => { browserHistory.push('/login')}}> 
                Allready Register ?
              </p>
            </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;