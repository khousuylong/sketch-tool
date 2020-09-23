import React from 'react'
import { ApolloProvider, useMutation, useQuery } from '@apollo/client'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import PubSub from 'pubsub-js'
import {UPDATE_PLUGIN_SETTING_MUTATION, PLUGIN_SETTING_QUERY} from '../queries/pluginQuery'

const AdminSetting = (props) => {
  const [selectedValue, setSelectedValue] = React.useState('metric');

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const Form = () => {
    const [saveSetting] = useMutation(UPDATE_PLUGIN_SETTING_MUTATION);

    const save = async event => {
      event.preventDefault()
      const payload = {
        metrix: selectedValue
      }
      const data = await saveSetting({ variables: { id: props.settingId, setting: JSON.stringify(payload) }});
      console.log('data return', data)
      if(data){
        props.client.writeQuery({
          query: PLUGIN_SETTING_QUERY,
          data: {
            pluginSetting: data.updatePluginSetting
          }
        })
      }
    }

    const saveMe = event => {
      const payload = {
        metrix: selectedValue
      }
     const data = saveSetting({ variables: { id: props.settingId, setting: JSON.stringify(payload) }});
      console.log('save me', payload)
    }

    return(
      <FormControl component="fieldset" >
        <FormLabel component="legend">Unit of Measurement</FormLabel>
        <RadioGroup defaultValue="metric" aria-label="gender" name="customized-radios">
          <FormControlLabel value="metric" control={
            <Radio
              checked={selectedValue === 'metric'}
              onChange={handleChange}
              value="metric"
              color="default"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'Metric' }}
            />
          } label="Kilometers / Hectares / Meters" />
          <FormControlLabel value="imperial" control={
            <Radio
              checked={selectedValue === 'imperial'}
              onChange={handleChange}
              value="imperial"
              color="default"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'Imperial' }}
            />
          } label="Miles / Acres / Feet" />
        </RadioGroup>
        <Button onClick={saveMe} type="submit" variant="outlined" color="primary">
          Save
        </Button>
      </FormControl>
    )
  }


  return(
    <ApolloProvider client={props.client}>
      <Form />
    </ApolloProvider>
  )
}

export default AdminSetting;
