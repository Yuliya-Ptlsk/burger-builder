import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggle} />        
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DescktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;