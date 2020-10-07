import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import reactCSS from 'reactcss';
import { CompactPicker } from 'react-color';

const styles = theme => ({
	listItem: {
		paddingTop: '5px',
		paddingBottom: '5px'
	}
});


class ColorPickerPanel extends Component{
  constructor(props){
		super(props);
		this.state = {
			open: false,
			color: this.props.color || "#FFF" 
		}
	}
	
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = (color) => {
		this.setState({ color: color.hex })
		this.handleClose();
		this.props.onChange(color.hex);
	};

	render(){
		const { classes, title, description, buttonText, testId=""} = this.props;
    const styles = reactCSS({
		  'default': {
			color: {
			  width: '25px',
			  height: '20px',
			  borderRadius: '2px',
			  background: this.state.color
			},
			swatch: {
			  padding: '5px',
			  background: '#fff',
			  borderRadius: '1px',
			  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
			  display: 'inline-block',
			  cursor: 'pointer',
			},
		  },
		});
    return(
      <React.Fragment>
				<div className={classes.listItem}>
					<Grid container>
						<Grid item xs={12} alignItems='center' sm container>
							<Grid item >
								<ListItemText primary={title} />
								<ListItemText secondary={description} className="no-padding"/>
							</Grid>
							<Grid item xs container justify="flex-end">
								<div data-testid={`${testId}-open-picker`} style={ styles.swatch } onClick={ this.handleClickOpen }>
									<div style={ styles.color } />
								</div>
							</Grid>
						</Grid>
					</Grid>
				</div>
				<Dialog
          data-testid="color-picker-dialog"
					maxWidth="lg"
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent className={classes.noPadding} id="alert-dialog-description">
						{this.props.colors ? 
							(<CompactPicker colors={this.props.colors} color={ this.state.color } onChange={ this.handleChange } />)
							:
							(<CompactPicker color={ this.state.color } onChange={ this.handleChange } />)
						}
					</DialogContent>
				</Dialog>
			</React.Fragment>
    )
	}
}
export default withStyles(styles)(ColorPickerPanel);
