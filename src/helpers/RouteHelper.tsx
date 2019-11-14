import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AppPrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  let isSignedIn = false;
  let username = localStorage.getItem("username") === null ? "null" : localStorage.getItem("username")
  let tokenRR = localStorage.getItem("tokenRR") === null ? "null" : localStorage.getItem("tokenRR")
  let tokenQC = localStorage.getItem("tokenQC") === null ? "null" : localStorage.getItem("tokenQC")
  if (username != "null" && tokenRR != "null" && tokenQC != "null") {
    isSignedIn = true
    if (location.pathname == "/") {
      return (
        <Route
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: '/home',
                state: { from: props.location }
              }}
            />
          )}
        />
      )
    }
  }
  return (
    <Route
      {...rest}
      render={props => (
        isSignedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
      )}
    />
  )
}
export const AppPublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}
export const AppAuthenticatedTopMenuRoute = ({ component: Component, layoutPublic: PublicLayout, layoutPrivate: PrivateLayout, ...rest }) => {
  let isSignedIn = false;
  let username = localStorage.getItem("username") === null ? "null" : localStorage.getItem("username")
  let tokenRR = localStorage.getItem("tokenRR") === null ? "null" : localStorage.getItem("tokenRR")
  let tokenQC = localStorage.getItem("tokenQC") === null ? "null" : localStorage.getItem("tokenQC")
  if (username != "null" && tokenRR != "null" && tokenQC != "null") {
    isSignedIn = true
  }
  return (
    <Route
      {...rest}
      render={props => (
        isSignedIn ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
            <PublicLayout>
              <Component {...props} />
            </PublicLayout>
          )
      )}
    />
  )
}
export const AppAuthenticatedRoute = ({ component: Component, ...rest }) => {
  let username = localStorage.getItem("username") === null ? "null" : localStorage.getItem("username")
  let tokenRR = localStorage.getItem("tokenRR") === null ? "null" : localStorage.getItem("tokenRR")
  let tokenQC = localStorage.getItem("tokenQC") === null ? "null" : localStorage.getItem("tokenQC")
  if (username != "null" && tokenRR != "null" && tokenQC != "null" && location.pathname == "/") {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: props.location }
            }}
          />
        )}
      />
    )
  } else {
    return (
      <Route
        {...rest}
        render={props => (
          <Component {...props} />
        )}
      />
    )
  }
}
