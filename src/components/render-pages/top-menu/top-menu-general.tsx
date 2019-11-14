import * as React from 'react';
import { Menu, Input } from 'semantic-ui-react';
import './top-menu.css';
var logo = require('../../../assets/images/logo.png');
var logoGignox = require('../../../assets/images/logo-gignox.png');

export const TopMenuGeneral = () => {
    // const [toggleLeftSideBar, settoggleLeftSideBar] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState("home");
    return (
        <div>

            <Menu color="black" stackable inverted>
                <Menu.Item>
                    <a href="/" className="logo_link">
                        <img src={logo} className="topmenu-app-logo" alt="logo" />
                        <img src={logoGignox} className="topmenu_logo_word" alt="logo" />
                    </a>
                </Menu.Item>

                <Menu.Item
                    name='features'
                    active={activeItem === 'features'}
                    onClick={() => setActiveItem("home")}
                >
                    Features
                </Menu.Item>
                <Menu.Item
                    name='testimonials'
                    active={activeItem === 'testimonials'}
                    onClick={() => setActiveItem("home")}
                >
                    Testimonials
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'logout'}
                        onClick={() => window.location.href = "login"}
                    />
                    <Menu.Item
                        name='signup'
                        active={activeItem === 'logout'}
                        onClick={() => window.location.href = "signup"}
                    />
                </Menu.Menu>
            </Menu>

            {/* <div className="toggleLeftSideBar" style={{ display: toggleLeftSideBar ? 'block' : 'none' }}>
                <nav className="float-lefts">
                    <div className="mr-auto">
                        <div className="leftSideBar">
                            <Button.Group style={{ display: 'flex' }}>
                                <a href="/login" style={{ margin: '2px' }} className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signin")}>Sing in</a>
                                <a href="/signup" style={{ margin: '2px' }} className="ui basic inverted button" onClick={() => sessionStorage.setItem("authenticationType", "signup")}>Sign up</a>
                            </Button.Group>
                        </div>
                    </div>
                </nav>
            </div> */}
        </div>
    );
}
