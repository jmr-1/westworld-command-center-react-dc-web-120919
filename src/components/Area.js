import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList.js'



const Area = (props) => {

  let areaHosts = props.hosts.filter(host => host.area === props.areaInfo.name && host.active === true)

  return (
  <div className='area' id={props.areaInfo.name}>
    <h3 className='labels'>{props.areaInfo.name.replace(/_/g, ' ')}</h3>

    {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}
    {(props.hosts)? <HostList hosts={areaHosts} selectHost={props.selectHost} selectedHost={props.selectedHost}/> : null }

  </div>
  )
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
