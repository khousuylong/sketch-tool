import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import { makeExecutableSchema } from 'graphql-tools'
import Button from '@material-ui/core/Button'
import { SchemaLink } from '@apollo/client/link/schema'
import SettingsIcon from '@material-ui/icons/Settings'
import {typeDefs} from './schema/schema'
import {resolvers} from './schema/resolvers'
import AppMap from './map'
import SwipeableTemporaryDrawer from './drawer'
import SettingDrawer from './settingDrawer'
import './App.css';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const styles = theme => ({
  container: {
    margin: 'auto',
    maxWidth: '700px',
    minWidth: '300px',
    marginTop: '20px'
  }
});

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openSetting: false
    }
  }

  render() {
    return(
      <React.Fragment>
        <div style={{width: '100%', height: '100%', position: 'absolute'}}>
          <AppMap client={client}/>  
          <React.Fragment>
            <SwipeableTemporaryDrawer client={client} />
            <SettingDrawer client={client} open={this.state.openSetting} onClose={()=>this.setState({openSetting: false})} />
          </React.Fragment>
        </div>
        <div onClick={()=> this.setState({openSetting: true}) } style={{position: 'absolute', bottom: 22, right: 10, zIndex: 999}}>
          <Button variant="contained" style={{padding: 6, minWidth: 40}}><SettingsIcon /></Button>
        </div>
      </React.Fragment>
    ) 
  }
}
export default withStyles(styles)(App);
