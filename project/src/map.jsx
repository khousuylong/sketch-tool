import React, {memo} from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import {MeasureTool} from './dist/index'

const AppMap = memo(props=>{
	const position = [51.505, -0.09]
	return(
		<Map center={position} zoom={13} zoomControl={false}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MeasureTool client={props.client} settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/>
			<ZoomControl position="topright"/>
		</Map>
	)
})


export default AppMap;
