import React, { Component } from 'react';

import './Forecast.css';

const API_KEY = '58ff0718a86aa77fc9f754c6fb8a34d6';
const forecastUrl = (country, state) => `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(state)},${encodeURI(country)}&appid=${API_KEY}`;

class Forecast extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isLoaded: false,
      
      // Weather prediction string. Ex: "clear sky"
      forecast: null
    };
  }
  
  componentDidMount() {
    this.getForecast();
  }
  
  componentDidUpdate(prevProps) {
    // Check changes in state and get forecast
    if (prevProps.state !== this.props.state) {
      this.getForecast();
    }
  }
  
  // Get forecast for current country and state passed as props
  getForecast() {
    this.setState({ isLoaded: false });
    
    const { country, state } = this.props;
    
    fetch(forecastUrl(country, state))
      .then( res => res.json() )
      .then(
        (result) => {
          const forecast = result.weather && result.weather[0].description;
          this.setState({ forecast, isLoaded: true });
        },
        (error) => {
          console.error(error);
        }
      );
  }

  render() {
    const { isLoaded, forecast } = this.state;
    const { state, country } = this.props;
    
    return <div className="Forecast">
      { isLoaded ? (
        <div>
          { forecast ? (
            <div>{ forecast } in { state }, { country }</div>
          ) : (
            <div>No weather information for { state }, { country }</div>
          ) }
        </div>
      ) : (
        <div className="loading">
          Loading weather information for { state }...
        </div>
      ) }
    </div>;
  }
}

export default Forecast;
