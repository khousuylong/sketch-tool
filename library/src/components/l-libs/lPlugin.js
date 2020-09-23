import React from 'react'
import {withLeaflet} from 'react-leaflet'
import MeasureControlDefault from 'react-leaflet-measure'
import PubSub from 'pubsub-js'
import { ApolloProvider, useQuery } from '@apollo/client'
import {PLUGIN_SETTING_QUERY} from '../queries/pluginQuery'

const MeasureControl = withLeaflet(MeasureControlDefault);
const MeasureTool = function(props){
  const storeControl = control => {
    PubSub.subscribe("start-measure", function (msg, data) {
      control.leafletElement._startMeasure()
    });
  }

  const LoadSetting = () => {
    const { loading, error, data } = useQuery(PLUGIN_SETTING_QUERY, {
      variables: { id: props.settingId}
    })

    if (loading) return(
      <div style={{height: 200}}>Loadding...</div>
    );

    if (error) console.log('this is error', error);


    if(data){
      const {setting} = data.pluginSetting;
      const metrix = JSON.parse(setting).metrix;
      const measureOptions = {
        position: 'topright',
        primaryLengthUnit: metrix === "imperial" ? 'feet' : 'meters',
        secondaryLengthUnit: metrix === "imperial" ? 'miles' :'kilometers',
        primaryAreaUnit: metrix === "imperial" ? 'sqfeet' : 'sqmeters',
        secondaryAreaUnit: metrix === "imperial" ? 'acres' : 'hectars',
        activeColor: '#db4a29',
        completedColor: '#9b2d14'
      };

      return(
        <MeasureControl {...measureOptions} ref={control=> storeControl(control)} />
      )
    }
    return null;
  }

  return(
    <ApolloProvider client={props.client}>
      <LoadSetting />  
    </ApolloProvider>
  )
}
export default MeasureTool
