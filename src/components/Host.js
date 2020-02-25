import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={(props.selectedHost === props.hostInfo) ? "host selected" : "host"}
      onClick={e=>props.selectHost(e, props.hostInfo)}
      image={props.hostInfo.imageUrl}
      raised
    />
  )
}

export default Host
