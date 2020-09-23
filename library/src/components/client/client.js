import React from 'react'
import { ApolloProvider, useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {PLUGIN_SETTING_QUERY} from '../queries/pluginQuery'
import PubSub from 'pubsub-js'

const Client = (props) => {

  const LoadSetting = () => {
    const {data} = useQuery(PLUGIN_SETTING_QUERY, {
      variables: { id: props.settingId}
    })

    return(
      <div style={{padding: 10}} >
        <Typography variant="subtitle2" gutterBottom>
          Measure distances and areas
        </Typography>
        <Button variant="contained" onClick={()=> PubSub.publish("start-measure") }>Measure</Button>
      </div>
    )
  }

  return(
    <ApolloProvider client={props.client}>
      <LoadSetting />  
    </ApolloProvider>
  )
}

export default Client
