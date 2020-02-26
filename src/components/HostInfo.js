import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'

class HostInfo extends Component {
  // state = {
  //   options: null,
  //   value: "some_area"

  //   // options: [
  //   //   {key: "some_area", text: "Some Area", value: "some_area"},
  //   //   {key: "another_area", text: "Another Area", value: "another_area"}
  //   // ]
  //   // This state is just to show how the dropdown component works.
  //   // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  //   // Value has to match the value in the object to render the right text.

  //   // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  // }

  handleChange = (e, {value}) => {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled

    //check the hosts list first to count the number of people in each area 
    let numHostInArea = this.props.hosts.filter(host => host.area === value && host.active === true).length
    let maxHostsInArea = this.props.areaInfo.filter(area => area.name === value)[0].limit

    if(numHostInArea<maxHostsInArea || !this.props.selectedHost.active){

      this.props.selectedHost.area = value 
      fetch(`http://localhost:3000/hosts/${this.props.selectedHost.id}`,{
        method: 'PATCH',
        body: JSON.stringify(this.props.selectedHost),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
        }).then(res => res.json()).then(data => console.log(data))

        this.props.selectHost(e, this.props.selectedHost)
        let newLog = [...this.props.logs]
        this.props.logNewEvent(`${this.props.selectedHost.firstName} ${(this.props.selectedHost.lastName==='n/a')? null : this.props.selectedHost.lastName} set in area ${value}`, 'notify', newLog)
    }
    else{
      let newLog = [...this.props.logs]
      this.props.logNewEvent(`You are attemping to place too many hosts in ${value.replace(/_/g, ' ')}. The limit for that area is ${maxHostsInArea}.`, 'error', newLog)
    }
  }

  toggle = (e) => {

    let hostArea = this.props.selectedHost.area 
    let numHostInArea = this.props.hosts.filter(host => (host.area === hostArea && host.active === true)).length
    let maxHostsInArea = this.props.areaInfo.filter(area => area.name === this.props.selectedHost.area )[0].limit

    // console.log('Checking for num hosts:', numHostInArea,'max hosts:', maxHostsInArea)

    if((numHostInArea<maxHostsInArea && !this.props.selectedHost.active) || this.props.selectedHost.active){
      this.props.selectedHost.active = !this.props.selectedHost.active
      let activeStatus = this.props.selectedHost.active
      fetch(`http://localhost:3000/hosts/${this.props.selectedHost.id}`,{
        method: 'PATCH',
        body: JSON.stringify(this.props.selectedHost),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then(res => res.json()).then(data => console.log(data))
      this.props.selectHost(e, this.props.selectedHost)
      let newLog = [...this.props.logs]
      this.props.logNewEvent(
        `${(activeStatus)? 'Activated' : 'Decommissioned'} ${this.props.selectedHost.firstName} ${(this.props.selectedHost.lastName==='n/a')? null : this.props.selectedHost.lastName}`                      
        , `${(activeStatus)? 'warn': 'notify'}`, newLog)
    }
    else{
      let newLog = [...this.props.logs]
      this.props.logNewEvent(`You are attemping to place too many hosts in ${hostArea.replace(/_/g, ' ')}. The limit for that area is ${maxHostsInArea}.`, 'error', newLog)
    }
  }

  render(){
    console.log('hostinfo areainfo', this.props.areaInfo)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.selectedHost.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.selectedHost.firstName} {(this.props.selectedHost.lastName==='n/a')? null : this.props.selectedHost.lastName} | { (this.props.selectedHost.gender==='Male') ? <Icon name='man' /> : <Icon name='woman' />}
                
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={(this.props.selectedHost.active)? "Active" : "Decommissioned"}
                  checked={(this.props.selectedHost.active)? true : false}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.selectedHost.area}
                options={this.props.areaOptions}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
