import React, {memo} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMutation, useQuery } from '@apollo/client'
import {OPEN_SKETCH, EDIT_GEOJSON} from '../queries/pluginQuery'
import StyleEditor from './styleEditor'
import PubSub from 'pubsub-js'
import {useApolloClient} from '@apollo/client'
import {
  UPDATE_PLUGIN_STORAGE_MUTATION, 
  DELETE_PLUGIN_STORAGE_MUTATION, 
  PLUGIN_STORAGES_QUERY 
} from 'plugin-storage'

  
const Sketch = memo(props => {
  const apolloClient = useApolloClient()
  const {pluginStorages} = apolloClient.readQuery({query: PLUGIN_STORAGES_QUERY, variables: { pluginId: props.data.pluginId}})
  const [updateStorage, {data}] = useMutation(UPDATE_PLUGIN_STORAGE_MUTATION);
  const json = JSON.parse(props.data.json)

  let timer = null;
  const handleTextChange = evt => {
    const value = evt.target.value;
    if(timer) clearTimeout(timer);
    timer = setTimeout(function(){
      json['name'] = value;
      updateStorage({variables: { id: props.data.id, json: JSON.stringify(json) }})
    }, 500);
  }

  const DeleteSketch = () => {
		const [deleteSketch, {data}] = useMutation(DELETE_PLUGIN_STORAGE_MUTATION);
    if(data){
      apolloClient.writeQuery({
        query: PLUGIN_STORAGES_QUERY,
        variables: {pluginId: props.data.pluginId},
        data: {
          pluginStorages: pluginStorages.filter(storage => storage.id !== data.deletePluginStorage.id)
        }
      })
    }
    return(
      <Button variant="contained" onClick={() => {
				deleteSketch({variables: { id: props.data.id }})
      }}>Delete Sketch</Button>
    )    
  }

  const handleChanges = (panel) => (evt, expanded) => {
    props.onChange(panel, expanded)
    apolloClient.cache.writeQuery({
      query: OPEN_SKETCH,
      data: {
        isSketchOpened: expanded,
        sketchId: props.data.id 
      },
    });
  }

  const Editor = () => {
    const { data } = useQuery(EDIT_GEOJSON);
    if(data && data.isEditingGeoJson){
      return(<StyleEditor id={props.data.id} />)
    }else
      return(<DeleteSketch />)
  }

  return (
    <Accordion expanded={props.expanded === props.data.id} onChange={handleChanges(props.data.id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <TextField
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          id="standard-full-width"
          style={{ margin: 8 }}
          onChange={handleTextChange}
          defaultValue={json.name}
          placeholder="Placeholder"
          fullWidth
          margin="normal"
          inputProps={{
            'data-testid': props.data.id
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />        
      </AccordionSummary>
      <AccordionDetails style={{flexFlow: 'column'}}>
        
        <Editor />
      </AccordionDetails>
    </Accordion>
  );
})
export default Sketch;
