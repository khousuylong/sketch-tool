import React, {useState, memo} from 'react'
import { FeatureGroup  } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { useQuery, useMutation } from '@apollo/client'
import L from 'leaflet'
import {OPEN_SKETCH} from '../queries/pluginQuery'
import GeoJsonLayer from './geoJsonLayer'
import {
  PLUGIN_STORAGES_QUERY, 
  UPDATE_PLUGIN_STORAGE_MUTATION
} from 'plugin-storage'

const FGroup = memo((props) => {

  let fgRendered = false
  let activeStorage
  let fGref;
  const onCreated = e => {
    const geoJsons = []
    console.log('after created', fGref.getLayers())
    fGref.getLayers().map(layer => {
      const geoJSON = layer.toGeoJSON()

			if( layer instanceof L.Circle  ){
				geoJSON['properties']['radius']	= layer.getRadius();
				geoJSON['properties']['type'] = "circle";
			}
			geoJsons.push({
				options: layer['options'],		
				geojson: geoJSON 
			})
    })

    const json =  JSON.parse(activeStorage.json)
    json['geoJson'] = geoJsons;
  
    const payload = {
      id: activeStorage.id, json: JSON.stringify(json)
    }

    props.onUpdated(payload)
    
  }

  const RenderEditControl = () => {
    const { data } = useQuery(OPEN_SKETCH);
    if(data){// && data.isSketchOpened){
      const activeStorage = props.storages.find(storage => storage.id === data.sketchId)
      return(<GeoJsonLayer expanded={data.isSketchOpened} data={activeStorage} fgRef={fGref}/>)
    }
    return null;
  }


  const _onFeatureGroupReady = reactFGref => {
    fGref = reactFGref.leafletElement
  } 

  return(
    <FeatureGroup ref={ reactFGref => {
        if(reactFGref) _onFeatureGroupReady(reactFGref)
      }}>
      <RenderEditControl />
    </FeatureGroup>
  )
})
export default FGroup
