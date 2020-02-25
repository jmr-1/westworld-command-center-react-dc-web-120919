import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area.js'

const WestworldMap = (props) => {
  console.log('loading map')
  return (
    <Segment id="map" >
      {/* What should we render on the map? */}
      {props.areas.map(area => <Area areaInfo={area} key={area.id+area.name} hosts={props.hosts} selectHost={props.selectHost}/>)}
    </Segment>
  )
}

export default WestworldMap
