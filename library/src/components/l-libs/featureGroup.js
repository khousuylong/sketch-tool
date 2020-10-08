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

class FGroup extends React.Component {
  render() {
    const RenderEditControl = () => {
      const { data } = useQuery(OPEN_SKETCH);
      if(data){
        const activeStorage = this.props.storages.find(storage => storage.id === data.sketchId)
        return(<GeoJsonLayer client={this.props.client} onUpdated={this.props.onUpdated} expanded={data.isSketchOpened} data={activeStorage} fgRef={this._fGref}/>)
      }
      return null;
    }
    return(
      <FeatureGroup ref={ reactFGref => { 
        if(reactFGref){
          this._fGref = reactFGref.leafletElement 
          window._mapRef = this._fGref._map 
        }
      }} >
        <RenderEditControl />
      </FeatureGroup>
    )
  }
}

export default FGroup
