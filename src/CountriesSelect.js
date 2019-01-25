import React, { Component } from 'react';


const countriesUrl = 'https://restcountries.eu/rest/v2/all';

class CountriesSelect extends Component {
    
  constructor(props) {
    super(props);
    
    this.state = {
      isLoaded: false,
      countries: [],
    };
  }
    
  componentDidMount() {
    this.fetchCountries();
  }

  // Get countries list and set in component state
  fetchCountries() {
    this.setState({ isLoaded: false });
    
    fetch(countriesUrl)
      .then( res => res.json() )
      .then(
        result => {
          this.setState({
            countries: result.sort((a, b) => a.name.localeCompare(b.name) ),
            isLoaded: true
          });
        },
        error => { console.error(error); }
      );
  }
    
  selectionChanged(event) {
    // Report changes to selected country
    this.props.onCountryChange(event.target.value);
  }
    
  render() {
    const { isLoaded, countries } = this.state;
    return (
      <select onChange={this.selectionChanged.bind(this)} disabled={!isLoaded}>
        <option key="" value="">{ isLoaded ? 'Select a country' : 'Loading countries...' }</option>
        
        { isLoaded && countries.map( country => {
          return <option key={country.alpha3Code} value={country.alpha3Code}>{country.name}</option>;
        })}
      </select>
    );
  }
}

export default CountriesSelect;
