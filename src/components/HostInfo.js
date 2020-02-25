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

    console.log(value)
   this.props.selectedHost.area = value 
   fetch(`http://localhost:3000/hosts/${this.props.selectedHost.id}`,{
     method: 'PATCH',
     body: JSON.stringify(this.props.selectedHost),
     headers: {
       'Content-Type': 'application/json; charset=UTF-8'
     }
    }).then(res => res.json()).then(data => console.log(data))

    this.props.selectHost(e, this.props.selectedHost)

  }

  toggle = (e) => {
    console.log("The radio button fired");
    this.props.selectedHost.active = !this.props.selectedHost.active
    fetch(`http://localhost:3000/hosts/${this.props.selectedHost.id}`,{
      method: 'PATCH',
      body: JSON.stringify(this.props.selectedHost),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
     }).then(res => res.json()).then(data => console.log(data))
     this.props.selectHost(e, this.props.selectedHost)
  }

  render(){
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
                {this.props.selectedHost.firstName} | { (this.props.selectedHost.gender==='Male') ? <Icon name='man' /> : <Icon name='woman' />}
                {this.props.selectedHost.lastName}
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
