import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, logout } from "./auth";
import {AppBar, Divider, Button, IconButton, List, ListItem, ListItemText, Typography, Menu, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(0),
	},
	
  }));

const Nav = (props) => {
	
	// let elems = document.querySelectorAll('.dropdown-trigger');
	// M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, container: 'nav-wrapper'});

	const history = useHistory();
	
	const handleLogout = e => {
		e.preventDefault();
		logout()
		history.push("/login")
	}
	const user_name = JSON.parse(sessionStorage.getItem("@SecretToken"));

	 const classes = useStyles();
  
  	 const [anchorEl, setAnchorEl] = React.useState(null);
  	 const open = Boolean(anchorEl);

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

  const handleClose = () => {
    setAnchorEl(null);
  };
	return(
		<>
		<AppBar position="static">
		
		<List component="nav">
            <ListItem component="div">
                <ListItemText >
					<Button className={classes.menuButton}>
						<Link to="/">Home</Link>
					</Button>  
                </ListItemText>


                <ListItemText >
					<Button className={classes.menuButton}>
						<Link to ="/dashboard">Dashboard</Link>
					</Button> 
                </ListItemText>

                <ListItemText >
					<Button className={classes.menuButton}>
						<Link to="/contact">Contact</Link>
					</Button>
                </ListItemText>

				<ListItemText >
                    <Typography variant="h6">
					{isAuthenticated() ?<div>
						
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <i className="fa-user-alt"></i>
              </IconButton>
			 	 {user_name.user ? <Link to="/">{`Hi, ${user_name.user}`}</Link> : ''}
				{user_name.avatar ? <i className="fa-user-alt">van</i> : 
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose}><Link to="/user">my account</Link></MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
			  }
            </div>
			: <Link to="/login"><i className="fa-user-alt"></i></Link>}
                    </Typography>
                </ListItemText>
            </ListItem >
        </List>
		</AppBar>
		</>
	);
}

export default Nav;