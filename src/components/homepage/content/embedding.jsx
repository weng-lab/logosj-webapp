import React from 'react';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';

const Embedding = props => (
    <Grid.Row>
      <Grid.Column width={4} style={{ textAlign: "center" }}>
        <Icon className="image" style={{ fontSize: "96pt", color: "#000" }} />
      </Grid.Column>
      <Grid.Column width={12}>
        <Header as="h1">
          Flexible and highly customizable embedding
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          LogosJ renders highly customizable logos as vector graphics. You can layer
          custom annotations onto the logos, or combine logos together to show biological
          interactions. Our visual gallery provides visual samples along with the code
          required to create them.
        </p>
        <Button>Browse the gallery</Button>
      </Grid.Column>
    </Grid.Row>
);
export default Embedding;