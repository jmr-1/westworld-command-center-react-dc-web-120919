import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters.js'
import { Log } from './services/Log'


class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  constructor(){
    super()
    this.state = {

      areas: [],
      hosts: [],
      selectedHost: null,
      activated: false,
      logs: []
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
    
    // console.log('selected host:', host)
    this.setState({
      selectedHost: host
    })
  }

  makeAreaOptionsForHostInfo = (allAreas) => {

    return allAreas.map(area => {
      return {key: area.name, text: area.name.replace(/_/g, ' '), value:area.name}
    })
  }

  activateButton = (e) => {
    let areaList = this.state.areas
    let newLog = [...this.state.logs]
    
    //check to see if all areas would be able to fit all hosts
    if(!this.state.activated){
      for(let i=0; i<areaList.length; i++){
        let currentArea = areaList[i]
        let maxNumInArea = currentArea.limit 
        console.log('Checking area:', currentArea.name, ', max allowed:', maxNumInArea)
        
        //note: this will check if the combined hosts in one area, both activated and deactivated, will be a problem.
        //the rules check in HostInfo already checks if you can move to the area if they're active, so since these would be active anyway,
        //no need for a separate rules check for inactive vs. active hosts 
        let hostsInArea = [...this.state.hosts].filter(host => {return (host.area === currentArea.name)}).length 
        console.log('Hosts in', currentArea.name,':', hostsInArea)
        
        if(hostsInArea > maxNumInArea){
          //if not, do not allow activation. 
          newLog.unshift(Log.error('Too many hosts will be entering at least one area!'))
          this.setState({
            logs: newLog
          })
          
          return null 
        }
      }
    }
    //if so, activate everything 
    // console.log((this.state.activated)? "Deactivating": "Activating")
    let activatedHosts = [...this.state.hosts]
    activatedHosts.forEach(host => (!this.state.activated)? host['active'] = true: host['active'] = false)
    
    if(!this.state.activated){
      newLog.unshift(Log.warn('Activating all hosts!'))
    }
    else{
      newLog.unshift(Log.notify('Decommissioning all hosts!'))
    }

    this.setState({
      activated: !this.state.activated,
      hosts: activatedHosts,
      logs: newLog
    })
    // fetch('http://localhost:3000/hosts', {
    //   method: 'PUT',
    //   body: JSON.stringify(activatedHosts),
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // }).then(res => res.json()).then(data => console.log(data))
  }


  logNewEvent = (eventMessage, eventType, newLog) => {
    (eventType==='error')? newLog.unshift(Log.error(eventMessage)) : 
      (eventType==='notify')? newLog.unshift(Log.notify(eventMessage)) : 
      (eventType==='warn')? newLog.unshift(Log.warn(eventMessage)) : null  

    this.setState({
      logs: newLog
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas} hosts={this.state.hosts} selectedHost={this.state.selectedHost} selectHost={this.selectHost}/>
        <Headquarters logNewEvent={this.logNewEvent} logs={this.state.logs} hosts={this.state.hosts} selectedHost={this.state.selectedHost} selectHost={this.selectHost} areaOptions={this.makeAreaOptionsForHostInfo(this.state.areas)} areaInfo={this.state.areas} activated={this.state.activated} activateHandler={this.activateButton}/>
      </Segment>
    )
  }
}

export default App;
