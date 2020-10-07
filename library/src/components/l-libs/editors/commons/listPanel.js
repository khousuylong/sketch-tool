import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
const styles = theme => ({
	listItem: {
		paddingTop: '5px',
		paddingBottom: '5px'
	}
});


const ListPanel = (props) => {
	const { classes, label} = props;
	return(
    <ListItem style={{padding: 0}}>
			<div className={classes.listItem}>
				<ListItemText primary={label} />
        <ListItemSecondaryAction style={{right: 0}}>
        {props.children}
				</ListItemSecondaryAction>
			</div>
		</ListItem>
	);
}

export default withStyles(styles)(ListPanel);
