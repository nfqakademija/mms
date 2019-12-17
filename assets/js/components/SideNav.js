import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../actions/admin.actions";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import Badge from "@material-ui/core/Badge";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  menuButton: {
    //position: "fixed"
    // marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function SideNav() {
  const requestsCount = useSelector(state => state.users.requestsCount);

  const dispatch = useDispatch();

  function logout() {
    dispatch(adminActions.logout());
  }
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton
            className={clsx(classes.menuButton, {
              [classes.hide]: !open
            })}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/");
            }}
          >
            <ListItemIcon>
              <AssessmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Pagrindinis" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/users");
            }}
          >
            <ListItemIcon>
              <GroupOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Nariai" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/requests");
            }}
          >
            <ListItemIcon>
              {requestsCount === 0 ? (
                <PersonAddOutlinedIcon />
              ) : (
                <Badge badgeContent={requestsCount} color="primary">
                  <PersonAddOutlinedIcon />
                </Badge>
              )}
            </ListItemIcon>
            <ListItemText primary="Užklausos" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Laiškai" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText secondary="Atsijungti" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
