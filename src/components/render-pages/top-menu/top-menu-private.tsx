import * as React from 'react';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menus from '@material-ui/icons/Menu';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Settings from '@material-ui/icons/SettingsOutlined';
import LeftSideBar from '../left-bar/LeftBarhelper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import './top-menu.css';
import { fade } from '@material-ui/core/styles';
var logo = require('../../../assets/images/logo.png');
var logoGignox = require('../../../assets/images/logo-gignox.png');
export const TopMenuPrivate = () => {
    let [toggleLeftSideBar, settoggleLeftSideBar] = React.useState(false);
    let [userDropdown, setuserDropdown] = React.useState(false)

    // ---------Dropdown menu in Add menu of left side bar menu----------------
    var toggleOpen = false;
    var addToggle = document.getElementById("addToggle") as HTMLElement;
    var addToggleMenu = document.getElementById("addToggleMenu") as HTMLElement;
    if (addToggle) {
        addToggle.addEventListener('click', function () {
            if (toggleOpen === false) {
                addToggleMenu.style.display = "block";
                addToggleMenu.style.transition = "all .3s linear 0s";
                addToggleMenu.style.webkitTransition = " all .3s linear 0s";

                toggleOpen = true;
            }
            else {
                addToggleMenu.style.display = "none";
                toggleOpen = false;
            }
        });
    }

    window.addEventListener('click', function (e: any) {
        if (e.target.offsetParent != undefined && e.target.offsetParent.id != 'dd') {
            setuserDropdown(false)
        }
    });

    function SignOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("tokenRR");
        localStorage.removeItem("tokenQC");
        localStorage.removeItem("languagecode");
    }
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
                display: 'none',
                [theme.breakpoints.up('sm')]: {
                    display: 'block',
                },
            },
            search: {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 1),
              
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(1),
                    width: 'auto',
                },
            },
            searchIcon: {
                width: theme.spacing(7),
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            inputRoot: {
                color: 'inherit',
            },
            inputInput: {
                padding: theme.spacing(1, 1, 1, 7),
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    width: 120,
                    '&:focus': {
                        width: 200,
                    },
                },
            },
        }),
    );
    const classes = useStyles();
    return (
        <div>

            <nav className="top_menu">
                <a href="/" className="logo_link">
                    <img src={logo} className="topmenu-app-logo" alt="logo" />
                    <img src={logoGignox} className="topmenu_logo_word" alt="logo" />
                </a>
                <div className="mr-auto-topmenu">
                    <div className="gigx1">
                        <div className="gigx2">
                            <div className={classes.root}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'Search' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="profil_bar" id="profile_bar_id">

                            <div className="profil_content">
                                <div id="dd" className="wrapper-dropdown-3 active">
                                    <div id="user-menu" style={{ textAlign: 'center' }}>
                                        <button onClick={userDropdown == false ? () => setuserDropdown(true) : () => setuserDropdown(false)} className="avatar">
                                            <span><img src="https://banner2.kisspng.com/20180329/bpq/kisspng-avatar-education-professor-user-profile-faculty-boss-5abcab3d64aff2.9884136415223140454124.jpg" alt="logo" width='45px' style={{ borderRadius: '50%' }} /></span>
                                        </button>
                                    </div>
                                    <ul className="dropdown" style={{ display: userDropdown ? 'block' : 'none' }}>
                                        <li><a href="profile" style={{ width: '100%' }}><PermIdentity /> <span>Profil</span></a></li>
                                        <li><a href="settings" style={{ width: '100%' }}><Settings /> <span>Ayarlar</span></a></li>
                                        <li><a href="/" onClick={SignOut} style={{ width: '100%' }}><ExitToApp /><span> Sign out</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="toggle_menu" id="toggle_id" onClick={toggleLeftSideBar ? () => settoggleLeftSideBar(false) : () => settoggleLeftSideBar(true)}>
                    <Menus />
                </div>
            </nav>

            <div className="toggleLeftSideBar" style={{ display: toggleLeftSideBar ? 'block' : 'none' }}>
                <LeftSideBar />
            </div>
        </div>
    );
}


