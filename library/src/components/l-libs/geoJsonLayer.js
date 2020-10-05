import React, {useState, memo} from 'react'
import { FeatureGroup  } from 'react-leaflet'
import EditControl from './editControl'//"react-leaflet-draw"
import { useQuery, useMutation } from '@apollo/client'
import L from 'leaflet'
import {OPEN_SKETCH} from '../queries/pluginQuery'
import {
  PLUGIN_STORAGES_QUERY, 
  UPDATE_PLUGIN_STORAGE_MUTATION
} from 'plugin-storage'

const GeoJsonLayer = memo((props) => {
  const {fgRef, data} = props;
  const _rendreGeoJsonLayer = storage => {
    const json = JSON.parse(storage.json);

    if(!json.geoJson) return

    json.geoJson.map(geojson=>{
      const geojsonLayer = 	L.geoJson(geojson['geojson'], {
        style: geojson['options'],
        pointToLayer: function(feature, latlng) {
          console.log(feature)
          if (feature.properties.radius) {
            return new L.Circle(latlng, feature.properties.radius);
          }
          /*
          if( geojson['options']['type'] === "annotation"){
            var icon = L.icon({
              iconUrl: '',
              shadowUrl: '',
              iconSize:     [0, 0],
              shadowSize:   [0, 0], 
              iconAnchor:   [0, 0], 
              shadowAnchor: [0, 0], 
              popupAnchor:  [1, 1]
            });
            return L.marker(latlng, { icon: icon, type: 'annotation', annotation: geojson['options']['annotation']});
          }
          */
          console.log(geojson['options'])
          return L.marker(latlng)
          /*
            , {icon: L.icon({
            iconUrl: geojson['options']['icon']['options']['iconUrl'],
            iconSize:     [25, 41], 
            iconAnchor:   [12, 41]
          })});
          */
        }
      });
      geojsonLayer.eachLayer(function(layer){
        if(fgRef) fgRef.addLayer(layer);
      });

    })
  }

  const _onCreated = e => {
    const geoJsons = []
    fgRef.getLayers().map(layer => {
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

    const json =  JSON.parse(data.json)
    json['geoJson'] = geoJsons;
  
    const payload = {
      id: data.id, json: JSON.stringify(json)
    }
    props.onUpdated(payload)
  }

  const _onEditStart = e => {
    console.log('on edit start', e)
  }

  if(fgRef){
    fgRef.clearLayers()
    if(props.expanded){
      _rendreGeoJsonLayer(props.data)
      return(
        <EditControl  
          onCreated={_onCreated}
          position='topright'
          onEditStart={_onEditStart}
          draw={{
          }}
        />
      )
    }
  } 

  
})
export default GeoJsonLayer
