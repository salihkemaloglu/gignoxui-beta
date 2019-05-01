import * as React from 'react';
import { IndexLinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, ProgressBar } from 'react-bootstrap';
import './nav_menu.css';
import ScreenShare from '@material-ui/icons/ScreenShareOutlined';
import AccessTime from '@material-ui/icons/AccessTime';
import StarOutlined from '@material-ui/icons/StarBorderOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddBoxOutlined';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined';

export const NavMenu = () => {

  const now = 60
  window.onload = () => {
    var addElement: HTMLElement = document.getElementById('addToggle') as HTMLElement;
    addElement.onmousedown = function () {
      addElement.style.display = 'hidden';
    }
  }
  var toggleOpen = false;
  window.onload = () => {
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
    }
    window.onload = () => {

      var userMenu = document.getElementById("user-menu") as HTMLElement;
      var userMenuBar = document.getElementById("dropdown-bar") as HTMLElement;
      if (userMenu) {
          userMenu.addEventListener('mouseover', function () {
              userMenuBar.style.display = "block";
          });
          userMenuBar.addEventListener('mouseover', function () {
              userMenuBar.style.display = "block";
          });
          userMenuBar.addEventListener('mouseleave', function () {
              userMenuBar.style.display = "none";
          });
          userMenu.addEventListener('mouseleave', function () {
              userMenuBar.style.display = "none";
          });
      }

  }

  

  return (
    <div>
      <Navbar variant="dark" className="float-left" style={{ boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0), 0 2px 3px 0 rgba(0, 0, 0, 0.12)', backgroundColor: 'black', padding: '20px', flexDirection: 'column', height: '-webkit-fill-available', width: '282px' }}>
        <Nav className="mr-auto" style={{ padding: '0', flexDirection: 'column' }}>
          <div className="lefSideBar">

            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a id="addToggle"><span className="leftNavLinkIcon"> <AddCircleOutlineOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Add</span></a>
            </IndexLinkContainer>
            <div id="addToggleMenu" style={{ width: '85%', float: 'right', display: 'none' }}>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FileCopyOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu" id="addToggle">Add File</span></a>
              </IndexLinkContainer>
              <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box', borderBottom: '1px solid #5b5b5b' }}>
                <a><span className="leftNavLinkIcon"> <FolderOpenOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu" id="addToggle">Add Folder</span></a>
              </IndexLinkContainer>
            </div>
            <IndexLinkContainer to="/help" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a><span className="leftNavLinkIcon"> <ScreenShare className="iconsSvg" /></span><span className="leftNavLinkMenu">Shared With Me</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="openedfiles" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><AccessTime className="iconsSvg" /></span><span className="leftNavLinkMenu">Latest</span></a>
            </IndexLinkContainer>
            <IndexLinkContainer to="about" className="leftNavItem" style={{ display: '-webkit-inline-box' }}>
              <a ><span className="leftNavLinkIcon"><StarOutlined className="iconsSvg" /></span><span className="leftNavLinkMenu">Starred</span></a>
            </IndexLinkContainer>
            <div className="leftNavItemStorage">
              <span className="leftNavLinkMenu">Storage</span>
              <ProgressBar now={now} label={`${now}%`} style={{ height: '17px', border: '1px solid #add4ff', backgroundColor: 'white' }} />
            </div>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}