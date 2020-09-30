import React, {useState, memo} from 'react'
import { FeatureGroup  } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { ApolloProvider, useQuery } from '@apollo/client'
import {OPEN_SKETCH} from '../queries/pluginQuery'
import {
  PLUGIN_STORAGES_QUERY 
} from 'plugin-storage'

const SketchTool = memo((props) => {
  const [renderDraw, setRenderDraw] = useState(false);

  const RenderEditControl = () => {
    const { data } = useQuery(OPEN_SKETCH);
    /*
    const {data} = useQuery(PLUGIN_STORAGES_QUERY, {
      variables: { pluginId: props.pluginId}
    })
    */

    if(data && data.isSketchOpened){
      console.log('sketh storage', data)
      return(
        <EditControl
          position='topright'
          draw={{
          }}
        />
      )
    }
    return null;
  }

  return(
    <ApolloProvider client={props.client}>
      <FeatureGroup>
        <RenderEditControl />
      </FeatureGroup>
    </ApolloProvider>
  )
})
export default SketchTool
