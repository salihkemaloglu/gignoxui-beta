import * as React from 'react';
import './not-found.css';
import { Grid, Container } from 'semantic-ui-react';
export const NotFound = () => {
  return (
    <Container >
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <h1 className="oops">Oops!</h1>
          </Grid.Column>
            <p className="pagenotfound">404 - Page not found</p>
            <p className="detail">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        </Grid.Row>
      </Grid>
    </Container>
  );
};