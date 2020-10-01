import React, {useState, memo} from 'react'
import { FeatureGroup  } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import { useQuery, useMutation } from '@apollo/client'
import L from 'leaflet'
import {OPEN_SKETCH} from '../queries/pluginQuery'
import {
  PLUGIN_STORAGES_QUERY, 
  UPDATE_PLUGIN_STORAGE_MUTATION
} from 'plugin-storage'

const GeoJsonLayer = memo((props) => {
  const {fgRef} = props;
  const _rendreGeoJsonLayer = storage => {
    const json = JSON.parse(storage.json);

    if(!json.geoJson) return

    json.geoJson.map(geojson=>{
      const geojsonLayer = 	L.geoJson(geojson['geojson'], {
        style: geojson['options'],
        /*
        pointToLayer: function(feature, latlng) {
          if (feature.properties.radius) {
            return new L.Circle(latlng, feature.properties.radius);
          }
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
          return L.marker(latlng, {icon: L.icon({
            iconUrl: geojson['options']['icon']['options']['iconUrl'],
            iconSize:     [25, 41], 
            iconAnchor:   [12, 41]
          })});
        }
        */
      });
      geojsonLayer.eachLayer(function(layer){
        if(fgRef) fgRef.addLayer(layer);
      });

    })
  }

  const onCreated = () => {}

  fgRef.clearLayers()

  if(props.expanded){
    _rendreGeoJsonLayer(props.data)
    return(
      <EditControl  
        onCreated={onCreated}
        position='topright'
        draw={{
        }}
      />
    )
  }
})
export default GeoJsonLayer
