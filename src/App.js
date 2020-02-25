import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'


class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  constructor(){
    super()
    this.state = {

      areas: [],
      hosts: [],
      selectedHost: {},
    }
  }

  componentDidMount(){

    this.fetchAreas();
    this.fetchHosts();
  }

  fetchAreas = () => {
    fetch('http://localhost:3000/areas')
    .then(res=> res.json()).then(data => this.setState({areas: data}))
  }

  fetchHosts = () => {
    fetch ('http://localhost:3000/hosts')
    .then(res => res.json()).then(data=> this.setState({hosts: data}))
  }

  selectHost = (e, host) => {
    
    console.log('selected host:', host)
    this.setState({
      selectedHost: host
    })
  }

  makeAreaOptionsForHostInfo = (allAreas) => {

    return allAreas.map(area => {
      return {key: area.name, text: area.name.replace(/_/g, ' '), value:area.name}
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas} hosts={this.state.hosts} selectedHost={this.state.selectedHost} selectHost={this.selectHost}/>
        <Headquarters hosts={this.state.hosts} selectedHost={this.state.selectedHost} selectHost={this.selectHost} areaOptions={this.makeAreaOptionsForHostInfo(this.state.areas)}/>
      </Segment>
    )
  }
}

export default App;
