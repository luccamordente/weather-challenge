import React, { Component } from 'react';

import CountriesSelect from './CountriesSelect';
import StatesSelect from './StatesSelect';
import Forecast from './Forecast';

import './App.css';

class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      state: null
    }
  }
  
  // Updates country with selected value and nullifies state
  // Executed when country selection is changed
  handleCountryChange(value) {
    this.setState({country: value, state: null});
  }
  
  // Updates state with selected value
  // Executed when state selection is changed
  handleStateChange(value) {
    this.setState({state: value});
  }
  
  render() {
    return (
      <div className="App">
        <h1 className="title">Weather</h1>
        
        <div className="select-field">
          <CountriesSelect onCountryChange={this.handleCountryChange.bind(this)} />
        </div>
        
        <div className="select-field">
          { this.state.country && <StatesSelect country={this.state.country} onStateChange={this.handleStateChange.bind(this)} /> }
        </div>
        
        <div className="forecast">
          { this.state.country && this.state.state && <Forecast country={this.state.country} state={this.state.state} /> }
        </div>
      </div>
    );
  }
}

export default App;
