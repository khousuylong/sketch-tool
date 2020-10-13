import React, {memo} from 'react'
import { ApolloProvider, useQuery, useMutation } from '@apollo/client'
import {
  PLUGIN_STORAGES_QUERY, 
  UPDATE_PLUGIN_STORAGE_MUTATION
} from 'plugin-storage'
import FGroup from './featureGroup'

const LControl = memo((props) => {
  const RenderFGroup = () => {
    const [updateStorage] = useMutation(UPDATE_PLUGIN_STORAGE_MUTATION);
    const {data} = useQuery(PLUGIN_STORAGES_QUERY, {
      variables: { pluginId: props.pluginId}
    })
    const handleUpdate = payload => {
      updateStorage({variables: payload})
    }
    if(data){
      return(
        <FGroup onUpdated={handleUpdate} client={props.client} pluginId={props.pluginId} storages={data.pluginStorages}/>
      ) 
    }
    return null
  }
  return(
    <ApolloProvider client={props.client} >
      <RenderFGroup />
    </ApolloProvider>
  )
})
export default LControl
