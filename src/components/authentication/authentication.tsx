import * as React from 'react';
import Done from '@material-ui/icons/Done';
import Cross from '@material-ui/icons/WarningOutlined';
import { Dropdown, Flag, Label, Form } from 'semantic-ui-react'
var logo = require('../../app_root/images/logo.png');
var logoGignox = require('../../app_root/images/logo_gignox.png');
var logos = require('../../app_root/images/authentication_page_background_image.png');
import './authentication.css';
import { useState } from 'react';
import { UserLogin, User } from '../../proto/gigxRR_pb';
import { i18next, lang } from '../../services/localization_service'
import { DoLoginUserRequest, DoRegisterUserRequest } from '../../controllers/authentication_controller';
import { GeneralResponseModal } from 'src/modals/general_response_modal';
import { grpc } from '@improbable-eng/grpc-web';
// import { DoGetIpAddressRequest } from '../../controllers/ipinfo_controller';

export const Authentication = () => {


  var [fade, setFade] = useState("signup");
  var userLogin = new UserLogin();
  var user = new User();
  // var ipinfo = sessionStorage.getItem("ipinfo") === null ? JSON.parse(JSON.stringify("")) : sessionStorage.getItem("ipinfo")
  // if (ipinfo === "") {
  //   DoGetIpAddressRequest();
  // }

  function login() {
    var login_button = document.getElementById('login_button') as HTMLButtonElement;
    login_button.disabled = true;
    if (!userLogin.getUsername() || !userLogin.getPassword()) {
      let username = (document.getElementById("usernameLogin") as HTMLInputElement).value;
      let password = (document.getElementById("passwordLogin") as HTMLInputElement).value;
      if (username && password) {
        userLogin.setUsername(username);
        userLogin.setPassword(password);
        DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            sessionStorage.setItem("token", userLoginResponse_.getToken());
            sessionStorage.setItem("username", userLoginResponse_.getUsername());
            localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
            sessionStorage.setItem("routingPage", "nav_menu");
            window.location.href = '/home'
          } else {
            console.log(generalResponseModalResponse_.GrpcResponseCode)
            console.log(generalResponseModalResponse_.GrpcResponseMessage)
          }
        });
      } else {
        console.log("username and password can not be null")
      }


    } else {
      DoLoginUserRequest(userLogin, function (userLoginResponse_: UserLogin, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
          sessionStorage.setItem("token", userLoginResponse_.getToken());
          sessionStorage.setItem("userName", userLoginResponse_.getUsername());
          localStorage.setItem("languageCode", userLoginResponse_.getLanguageCode())
          sessionStorage.setItem("routingPage", "nav_menu");
          location.reload();
        } else {
          console.log(generalResponseModalResponse_.GrpcResponseCode)
          console.log(generalResponseModalResponse_.GrpcResponseMessage)
        }
      });
    }
    login_button.disabled = false;

  }
  function signup() {
    if (!user.getUsername() || !user.getEmail() || !user.getPassword) {
      let username = (document.getElementById("username_form") as HTMLInputElement).value;
      let email = (document.getElementById("email_form") as HTMLInputElement).value;
      let password = (document.getElementById("password_form") as HTMLInputElement).value;
      if (username && password && email) {
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        DoRegisterUserRequest(user, function (userRegisterResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
          if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.OK) {
            // sessionStorage.setItem("token", userRegisterResponse_.getToken());
            sessionStorage.setItem("username", userRegisterResponse_.getUsername());
            localStorage.setItem("languageCode", userRegisterResponse_.getLanguageCode())
            sessionStorage.setItem("routingPage", "nav_menu");
            window.location.href = '/home'
          } else {
            console.log(generalResponseModalResponse_.GrpcResponseCode)
            console.log(generalResponseModalResponse_.GrpcResponseMessage)
          }
        });

      } else {
        console.log("Fields cannot be empty")
      }

    }
    return null
  }
  function handleEmailChangeForLogin(e: any) {
    userLogin.setUsername(e.target.value)
  }
  function handlePasswordChangeForLogin(e: any) {
    userLogin.setPassword(e.target.value)
  }

  function handleUsernameChangeForRegister(e: any) {
    if (e.target.value.length > 0) {
      var validation_username = document.getElementById('validation_username') as HTMLElement;
      var username_label = document.getElementById('username_label') as HTMLElement;
      var exist = document.getElementById('user_exist_done') as HTMLElement;
      var non_exist = document.getElementById('user_exist_cross') as HTMLElement;

      user.setUsername(e.target.value)
      user.setEmail("")
      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)

          validation_username.innerText = "Bu kullanıcı adı zaten mevcut";
          validation_username.style.display = "inline-flex"
          username_label.style.color = 'red'
          exist.style.display = 'none';
          non_exist.style.display = 'block';

        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")


          // validation_username.innerText = "Bu sizin kullanıcı adınız olacak";  
          // validation_username.style.display = "inline-flex"
          // validation_username.style.color = "green"

          validation_username.style.display = "none"
          username_label.style.color = 'green';
          exist.style.display = 'block';
          non_exist.style.display = 'none';
        }
      });
    }
    else {
      var validation_username2 = document.getElementById('validation_username') as HTMLElement;
      var username_label2 = document.getElementById('username_label') as HTMLElement;
      var exist_done = document.getElementById('user_exist_done') as HTMLElement;
      var non_exist_cross = document.getElementById('user_exist_cross') as HTMLElement;

      validation_username2.style.display = "none"
      username_label2.style.color = 'black';
      exist_done.style.display = 'none';
      non_exist_cross.style.display = 'none';
    }
  }

  function handleEmailChangeForRegister(e: any) {
    if (e.target.value.length > 0) {

      var validation_email = document.getElementById('validation_email') as HTMLElement;
      var email_label = document.getElementById('email_label') as HTMLElement;
      var exist = document.getElementById('email_exist_done') as HTMLElement;
      var non_exist = document.getElementById('email_exist_cross') as HTMLElement;

      user.setEmail(e.target.value)
      user.setUsername("")

      DoRegisterUserRequest(user, function (userResponse_: User, generalResponseModalResponse_: GeneralResponseModal) {
        if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.AlreadyExists) {
          console.log(generalResponseModalResponse_.GrpcResponseMessage)

          validation_email.innerText = "Bu email geçersiz veya zaten alınmış";
          validation_email.style.color = "red"
          validation_email.style.display = "inline-flex"
          email_label.style.color = 'red'
          exist.style.display = 'none';
          non_exist.style.display = 'block';


        } else if (generalResponseModalResponse_.GrpcResponseCode == grpc.Code.FailedPrecondition) {
          console.log("ok")

          // validation_email.innerText = "Bu email adresine doğrulama mail'i göndereceğiz";
          // validation_email.style.color = "green"
          // validation_email.style.display = "inline-flex"

          validation_email.style.display = "none"
          email_label.style.color = 'green'
          exist.style.display = 'block';
          non_exist.style.display = 'none';
        }
      });
    }
    else {
      var validation_email2 = document.getElementById('validation_email') as HTMLElement;
      var email_label2 = document.getElementById('email_label') as HTMLElement;
      var exist_done = document.getElementById('email_exist_done') as HTMLElement;
      var non_exist_cross = document.getElementById('email_exist_cross') as HTMLElement;
      validation_email2.style.display = "none"
      email_label2.style.color = 'black';
      exist_done.style.display = 'none';
      non_exist_cross.style.display = 'none';
    }
  }
  return (
    <div className="wrap">
      <section className="navSection Logos" >
        <div className="nav-wrapper">
          <div className="mr-auto">
            <a href="/" className="active"><img src={logo} className="App-logo" alt="logo" /><img src={logoGignox} alt="logo" style={{marginBottom: '8px'}}/></a>
          </div>
        </div>
      </section>
      <section className="mainSection">
        <section className="leftSection">
          <img src={logos} style={{ width: "100%" }} />
        </section>
        <section className="rightSection">
          <div style={{ float: 'right', width: '100%', padding: '15px' }}>
            <Dropdown text={i18next.t("authentication_page_language")} icon='language' floating labeled button className='icon language_dropdown'>
              <Dropdown.Menu style={{ marginTop: '0' }}>
                <Dropdown.Divider />
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='france' /><Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "en")} text='En' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
                <div style={{ padding: '8px', cursor: 'pointer' }}><Flag name='turkey' /><Dropdown.Item href="." onClick={() => sessionStorage.setItem("language", "tr")} text='Tr' style={{ display: 'block', width: '74%', float: 'right' }} /></div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="sign-in-up-container">
            <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}> {i18next.t("authentication_page_sign_up")}</a>|
          <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_sign_in")}</a>
          </div>
          <div className="Signup" style={{ display: fade === "signup" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label>{i18next.t("authentication_page_or")} <a className="signin-title" onClick={() => setFade("signin")} style={{ fontSize: fade === "signin" ? '25px' : '15px' }}>{i18next.t("authentication_page_goto_sign_in")}</a></label>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label id="username_label" style={{ width: '100%' }}>{i18next.t("authentication_page_username")}</label>

                <Form.Field style={{padding: '5px'}}>
                  <input className="input_control" placeholder={i18next.t("authentication_page_username")} autoFocus type="text" style={{ width: '100%', float: 'left' }} onChange={handleUsernameChangeForRegister} id="username_form" />
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="user_exist_done"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                  <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="user_exist_cross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validation_username" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>

                {/* <input className="input_control" placeholder={i18next.t("authentication_page_username")} autoFocus type="text" style={{ width: '100%', float: 'left' }} onChange={handleUsernameChangeForRegister} id="username_form" />
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="user_exist_done"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="user_exist_cross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                <div className="validation_box" id="validation_username" style={{ display: "none", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' }}>validation</div> */}
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label id="email_label" style={{ width: '100%' }}>Email</label>
                <Form.Field style={{padding: '5px'}}>
                <input className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} onChange={handleEmailChangeForRegister} id="email_form" />
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="email_exist_done"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="email_exist_cross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                  <Label id="validation_email" basic color='red' pointing style={{ display: 'none' }} />
                </Form.Field>
                {/* <input className="input_control" placeholder="Email" autoFocus type="email" style={{ width: '100%', float: 'left' }} onChange={handleEmailChangeForRegister} id="email_form" />
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="email_exist_done"><Done style={{ color: 'green', fontSize: '20px' }} /></span>
                <span style={{ padding: '5px', display: 'none', width: '32px', position: 'absolute', right: '45px' }} id="email_exist_cross"><Cross style={{ color: 'red', fontSize: '20px' }} /></span>
                <div className="validation_box" id="validation_email" style={{ display: "none", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' }}>validation</div> */}
              </div>

              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label style={{ width: '100%' }}>{i18next.t("authentication_page_password")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_password")} style={{ width: '100%', float: 'left' }} id="password_form" />
              </div>
              {(() => {
                switch (lang) {
                  case 'en':
                    return <label>{i18next.t('authentication_page_terms_start')} {i18next.t('authentication_page_accept_terms')} <a className='signup-title'>{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title'>{i18next.t('authentication_page_privacy_policy')}</a></label>;
                  case 'tr':
                    return <label>{i18next.t('authentication_page_terms_start')} <a className='signup-title' >{i18next.t('authentication_page_terms')}</a> {i18next.t('authentication_page_and')} <a className='signup-title' >{i18next.t('authentication_page_privacy_policy')} </a> {i18next.t('authentication_page_accept_terms')}</label>;
                  default:
                    return "null";
                }
              })()}
              <button className="btn_primary" style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" /* onClick={() => setFade("verification")} */ onClick={signup}>
                {i18next.t("authentication_page_sign_up")}
              </button>
            </form>
          </div>

          <div className="Login" style={{ display: fade === "signin" ? 'block' : 'none' }}>
            <form className="loginForm">
              <label>{i18next.t("authentication_page_or")} <a className="signup-title" onClick={() => setFade("signup")} style={{ fontSize: fade === "signup" ? '25px' : '15px' }}>{i18next.t("authentication_page_create_an_account")}</a></label>
              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label>{i18next.t("authentication_page_username_or_email")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_username_or_email")} autoFocus type="email" id="usernameLogin" onChange={handleEmailChangeForLogin} />
              </div>
              <div style={{ display: 'flow-root', marginBottom: '1rem' }}>
                <label>{i18next.t("authentication_page_password")}</label>
                <input className="input_control" placeholder={i18next.t("authentication_page_password")} type="password" id="passwordLogin" onChange={handlePasswordChangeForLogin} />
              </div>
              <button className="btn_primary" onClick={login} style={{ width: '100%', backgroundColor: '#17a2b8' }} id="login_button">
                {i18next.t("authentication_page_sign_in")}
              </button>

              <div className="login-need-help"><a className="forgot-password-link" onClick={() => setFade("reset")}>
                {i18next.t("authentication_page_forgot_password")}</a></div>
            </form>
          </div>

          <div className="reset" style={{ display: fade === "reset" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_password_reset_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_password_reset_info")}<br /></label>
              <div>
                <label>Email</label>
                <input className="input_control" autoFocus type="email" />
              </div>
              <button className="btn_primary" style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button" >
                {i18next.t("authentication_page_password_reset")}
              </button>
            </form>
          </div>
          <div className="verification" style={{ display: fade === "verification" ? 'block' : 'none', paddingTop: '60px' }}>
            <form className="signupForm">
              <label className="codeColor"><h3> {i18next.t("authentication_page_verification_code_title")}</h3></label>
              <label className="codeColor">{i18next.t("authentication_page_verification_code_info")}<br /></label>

              <div>
                <label>Email</label>
                <input className="input_control" autoFocus type="email" />
              </div>
              <button className="btn_primary" style={{ width: '100%', backgroundColor: '#17a2b8' }} type="button">
                {i18next.t("authentication_page_verificate_code")}
              </button>
              <label className="cursor" style={{ marginTop: "2%" }}>{i18next.t("authentication_page_verificate_did_not_get")}</label>
            </form>
          </div>

        </section>
      </section>
    </div>
  );
};
