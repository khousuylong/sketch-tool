import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {Client} from './dist/index'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft' 
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useQuery } from '@apollo/client'
//import {PLUGINS_QUERY} from '../../queries/pluginQuery'

const useStyles = makeStyles({
	drawerRoot:{
		overflowY: 'visible'
	},
	drawerPoint: {
		position: 'absolute',
    right: '-28px',
		cursor: 'pointer',
		visibility: 'visible !important',
    top: '14px',
		padding: '7px 2px',
    borderRadius: '0px 5px 5px 0px',
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderLeft: 0
	},
  list: {
    width: 250,
  }
});

const SwipeableTemporaryDrawer = function(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

	/*
	const Plugins = () => {
		const { loading, error, data } = useQuery(PLUGINS_QUERY)
		if (loading) return(
			<div style={{height: 200}}>
				<Spinner />
			</div>
		);
		if (error) console.log('this is error', error);

		return(
			<div className={clsx(classes.fullList)}>
				{
					data.plugins.map(plugin=>{
						if(plugin.active){
							return <Plugin key={plugin.name} data={plugin}/>
						}
						return null
					})
				}
			</div>
		)
	}
	*/

	const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
			<Client client={props.client} settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3"/>
    </div>
  );
	
			//<Plugins />
	const anchor = 'left';

  return (
    <div>
			<React.Fragment key={anchor}>
				<SwipeableDrawer
					classes={{paper:classes.drawerRoot}}
					anchor={anchor}
					open={state[anchor]}
					onClose={toggleDrawer(anchor, false)}
					onOpen={toggleDrawer(anchor, true)}
					variant="persistent"
				>
					<div className={classes.drawerPoint}>
					{
						state[anchor] ? <ChevronLeftIcon onClick={toggleDrawer(anchor, false)}/> : <ChevronRightIcon onClick={toggleDrawer(anchor, true)}/> 
					}
					</div>
					{list(anchor)}
				</SwipeableDrawer>
			</React.Fragment>
    </div>
  );
}

export default SwipeableTemporaryDrawer
