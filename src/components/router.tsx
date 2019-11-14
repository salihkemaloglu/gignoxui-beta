import * as React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AppNavMenuLayout, AppGeneralLayout, AppPrivateLayout } from '../App';
import { Home, Dashboard, Help, PasswordReset, PasswordResetSendMail, Profile, Authentication, NotFoundPage, About, Settings, CreateTimeCapsule } from '../components';
import { AppPrivateRoute, AppAuthenticatedRoute, AppPublicRoute, AppAuthenticatedTopMenuRoute } from '../helpers/RouteHelper';
export const AppRouter = () => {
  function WaitingComponent(Component: any) {
    return props => (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </React.Suspense>
    );
  }
  return (
    <BrowserRouter>
      <div className="container-fluid" style={{ padding: 0, height: '-webkit-fill-available' }}>
        <Switch>
          <AppPublicRoute exact path="/"  layout={AppGeneralLayout} component={WaitingComponent(Home)} />
          <AppAuthenticatedRoute exact path="/login" component={WaitingComponent(Authentication)} />
          <AppAuthenticatedRoute exact path="/signup" component={WaitingComponent(Authentication)} />
          <AppPrivateRoute exact path="/dashboard" layout={AppNavMenuLayout} component={WaitingComponent(Dashboard)} />
          <AppPrivateRoute exact path="/create-time-capsule" layout={AppNavMenuLayout} component={WaitingComponent(CreateTimeCapsule)} />
          <AppPrivateRoute exact path="/help" layout={AppNavMenuLayout} component={WaitingComponent(Help)} />
          <AppPrivateRoute exact path="/about" layout={AppNavMenuLayout} component={WaitingComponent(About)} />
          <AppPrivateRoute exact path="/settings" layout={AppPrivateLayout} component={WaitingComponent(Settings)} />
          <Route exact path="/password-reset" component={WaitingComponent(PasswordResetSendMail)} />
          <Route path="/password-reset/:id" component={WaitingComponent(PasswordReset)} />
          <AppAuthenticatedTopMenuRoute path="/:id" layoutPublic={AppGeneralLayout} layoutPrivate={AppPrivateLayout} component={WaitingComponent(Profile)} />
          <AppPublicRoute path="*" layout={AppGeneralLayout} component={WaitingComponent(NotFoundPage)} />
        </Switch>
      </div>
    </BrowserRouter >
  );
};