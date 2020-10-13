import React, {memo} from 'react'
import { Map, TileLayer, ZoomControl} from 'react-leaflet'
import {LControl} from './dist/index'


const AppMap = memo(props=>{
	const position = [51.505, -0.09]
	return(
		<Map center={position} zoom={13} zoomControl={false}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ZoomControl position="topright"/>
			<LControl client={props.client} pluginId="869a172a-1026-458d-8c6b-89590d16b5d5" settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/>
		</Map>
	)
})


export default AppMap;
