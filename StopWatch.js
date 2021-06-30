import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class StopWatch extends Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds:0,
      show:true,
    }
    this.hoursInput = React.createRef();
    this.minutesInput= React.createRef();
    this.secondsInput = React.createRef();
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
    
  }

  convertToSeconds = ( hours, minutes,seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
    this.setState({
        show:false
    })
  }

  countDown = () => {
    const  { hours, minutes, seconds } = this.state;
    let c_seconds = this.convertToSeconds(hours, minutes, seconds);

    if(c_seconds) {

      seconds ? this.setState({seconds: seconds-1}) : this.setState({seconds: 59});

      if(c_seconds % 60 === 0 && minutes) {
        this.setState({minutes: minutes -1});
      }

      if(!minutes && hours) {
        this.setState({minutes: 59});
      }

      if(c_seconds % 3600 === 0 && hours) {
        this.setState({hours: hours-1});
      }

    } else {
      clearInterval(this.timer);
    }
  }


  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      show:true,
    });
    
  }


  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <div className="App">

        <h1> {hours}: {minutes} : {seconds} </h1>
       
         {
             this.state.show ?  <div className="inputGroup">
             <p>Hours</p>
             <input ref={this.hoursInput} type="number" placeholder={0}  name="hours"  onChange={this.inputHandler} />
             <p>Minutes</p>
             <input  ref={this.minutesInput} type="number"  placeholder={0}   name="minutes"  onChange={this.inputHandler} />
             <p>Seconds</p>
             <input   ref={this.secondsInput} type="number"  placeholder={0}  name="seconds"  onChange={this.inputHandler} />
          </div> : ''
         }

        
         <div>
            <button onClick={this.startTimer} className="start">Start</button>
            <button onClick={this.stopTimer}  className="stop">Stop</button>
            <button onClick={this.resetTimer}  className="reset">Reset</button>
         </div>
         
      </div>

    );
  }
}

export default StopWatch;

