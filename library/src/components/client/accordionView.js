import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  CREATE_PLUGIN_STORAGE_MUTATION, 
  PLUGIN_STORAGES_QUERY,
  UPDATE_PLUGIN_STORAGE_MUTATION,
} from 'plugin-storage'
import { ApolloProvider, useMutation, useQuery, useApolloClient } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid';
import Sketch from './sketch';

const useStyles = makeStyles({
  centerItem: {
    display: 'flex',
    padding: 15,
    justifyContent: 'center'
  },
  root: {
    display: 'flex', 
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});

export default function AccordionView(props) {
  const apolloClient = useApolloClient()
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let pluginStorages;

  const RenderSketches = () => {
    const {data} = useQuery(PLUGIN_STORAGES_QUERY, {
      variables: { pluginId: props.pluginId}
    })

      console.log('here is the storage', data)
    if(data){
      pluginStorages = data.pluginStorages;
      return(
        <Paper style={{overflow: 'auto'}}>
          {
            data.pluginStorages.map(storage=>{
              return(<Sketch expanded={expanded} onChange={handleChange} key={storage.id} data={storage}/>)
            })
          }
        </Paper>
      )
    }
    return null;
  }

  const NewSketch = () => {
    const [createStorage, { data }] = useMutation(CREATE_PLUGIN_STORAGE_MUTATION);

    if(data){
      apolloClient.writeQuery({
        query: PLUGIN_STORAGES_QUERY,
        variables: { pluginId: props.pluginId},
        data: {
          pluginStorages: [...pluginStorages, data.createPluginStorage]
        }
      });
    }

    return(
      <Button variant="contained" onClick={() => {
        const jsonPayload = {
          'name': 'Untitled sketch',
          'description': '',
          'geoJson': '' 
        }
        createStorage({
          variables: { input: {id: uuidv4(), pluginId: props.pluginId, json: JSON.stringify(jsonPayload) }}
        })
      }}>Create sketch</Button>
    ) 
  }

  return (
    <div className={classes.root}>
      <div className={classes.centerItem}>
        <NewSketch />
      </div>
      <RenderSketches />
    </div>
  );
}
