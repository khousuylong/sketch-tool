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

  const _rendreGeoJsonLayer = storage => {
    console.log('ensure one time rendering')
    const json = JSON.parse(storage.json);

    if(!json.geoJson) return;

    console.log('---------------')

    json.geoJson.map(geojson=>{
      console.log('json', geojson)
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
        if(fGref) fGref.addLayer(layer);
      });

    })
  }

  const RenderEditControl = () => {
    const { data } = useQuery(OPEN_SKETCH);
    if(data && data.isSketchOpened){
      activeStorage = props.storages.find(storage => storage.id === data.sketchId)
      //Need to check this, because useQuery somehow cause the {data} to return twice
      //So with !fgRendered to ensure only one time the edit control is render
      if(!fgRendered){
        _rendreGeoJsonLayer(activeStorage)
        fgRendered = true
        return(
          <EditControl  
            onCreated={onCreated}
            position='topright'
            draw={{
            }}
          />
        )
      }  
    }
    return null;
  }


  const _onFeatureGroupReady = reactFGref => {

    /*
    let leafletGeoJSON = new L.GeoJSON(getGeoJson());
    let leafletFG = reactFGref.leafletElement;

    leafletGeoJSON.eachLayer( (layer) => {
      leafletFG.addLayer(layer);
    });
    */

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
