import React, {memo} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { AdminSetting } from './dist/index'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
	closeIcon: {
		position: 'absolute',
		zIndex: 2,
		top: 10,
		right: 10
	},
  fullList: {
    width: 'auto',
  },
});

const SettingDrawer = memo(props => {
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
		props.onClose();
  };

  const content = () => (
    <div
      className={clsx(classes.fullList)}
      role="presentation"
    >
			<IconButton className={clsx(classes.closeIcon)} onClick={props.onClose}><CloseIcon /></IconButton>
			<div style={{padding: 20}}>
				<AdminSetting client={props.client} settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3" />
			</div>
    </div>
  );
	

				//<AdminSetting client={props.client} settingId="b67635cc-cb47-4aaf-b37b-42e470acfef3" />



  return (
    <div>
			<React.Fragment>
				<SwipeableDrawer
					anchor="bottom"
					open={props.open}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
					variant="persistent"
				>
					{content()}
				</SwipeableDrawer>
			</React.Fragment>
    </div>
  );
})

SettingDrawer.propTypes = {
  open: PropTypes.bool,
	client: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
};

export default SettingDrawer
