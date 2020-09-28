import React, {memo} from 'react'
import { Map, TileLayer, ZoomControl, FeatureGroup  } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"


const AppMap = memo(props=>{
	const position = [51.505, -0.09]
	return(
		<Map center={position} zoom={13} zoomControl={false}>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ZoomControl position="topright"/>
			<FeatureGroup>
				<EditControl
					position='topright'
					draw={{
						rectangle: false
					}}
				/>
			</FeatureGroup>
		</Map>
	)
})


export default AppMap;
