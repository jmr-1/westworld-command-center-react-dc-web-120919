import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage.js'
import HostInfo from './HostInfo.js'
import LogPanel from './LogPanel.js'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        {/* Something goes here.... */}
        {(this.props.hosts)? <ColdStorage hosts={this.props.hosts} selectHost={this.props.selectHost} selectedHost={this.props.selectedHost}/> : null }

        </Grid.Column>
        <Grid.Column width={5}>
          {
          (!this.props.selectedHost)?
          <Details /> :
          <HostInfo selectedHost={this.props.selectedHost} areaOptions={this.props.areaOptions} selectHost={this.props.selectHost} areaInfo={this.props.areaInfo} hosts={this.props.hosts}/>
          }
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel activatedStatus={this.props.activated} activateHandler={this.props.activateHandler}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
