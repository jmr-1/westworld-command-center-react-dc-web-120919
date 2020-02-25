import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host.js'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
      {props.hosts.map(host => <Host hostInfo={host} key={host.id} selectHost={props.selectHost} selectedHost={props.selectedHost}/>)}
    </Card.Group>
  )
}

export default HostList
