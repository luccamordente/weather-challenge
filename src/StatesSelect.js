import React, { Component } from 'react';


const statesUrl = (country) => `http://services.groupkt.com/state/get/${country}/all`;

class StatesSelect extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      states: []
    };
  }
  
  componentDidMount() {
    console.log("fetch states");
    this.fetchStates();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.fetchStates();
    }
  }
    
  fetchStates() {
    this.setState({ isLoaded: false });
    
    fetch(statesUrl(this.props.country))
      .then( res => res.json() )
      .then(
        result => {
          this.setState({
            states: result.RestResponse.result,
            isLoaded: true
          });
        },
        error => { console.error(error); }
      );
  }
    
  selectionChanged(event) {
    // Report changes to selected state
    this.props.onStateChange(event.target.value);
  }
    
  render() {
    const { isLoaded, states } = this.state;
    const { country } = this.props;
    
    return (
      <select onChange={this.selectionChanged.bind(this)} disabled={!isLoaded || !states.length}>
      <option key="" value="">
        { isLoaded ? (
          states.length ? 'Select a state' : `No states found in ${country}`
        ) : (
          `Loading ${country} countries...`
        ) }
      </option>
        { states.map( state => <option key={state.id} value={state.name}>{state.name}</option> )}
      </select>
    );
  }
}

export default StatesSelect;
