import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import { Logo } from 'logos-to-go-react';

import { DINUCLEOTIDE_GLYPHMAP, DINUCLEOTIDE_PWM, MULTINUMBER_GLYPHMAP,
         TRINUCLEOTIDE_GLYPHMAP, TRINUCLEOTIDE_PWM } from './constants';

const DinucleotidePreview = () => (
    <Segment.Group>
      <Segment style={{ backgroundColor: "#f8f8f8" }}>
        <Header as="h2" style={{ marginBottom: "0em" }}>Multiple symbols</Header>
      </Segment>
      <Segment>
        <Grid style={{ textAlign: "center" }}>
          <Grid.Row>
            <Grid.Column width={16}>
              Logos using multiple letters per symbol.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={3} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                dinucleotide, colored by letter
              </div>
              <Logo height="10em" glyphmap={DINUCLEOTIDE_GLYPHMAP()} pwm={DINUCLEOTIDE_PWM} startpos={1} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={3} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                trinucleotide, colored by symbol
              </div>
              <Logo height="10em" glyphwidth={1.5} glyphmap={TRINUCLEOTIDE_GLYPHMAP} pwm={TRINUCLEOTIDE_PWM} startpos={1} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={3} style={{ textAlign: "center" }}>
              <div style={{ fontStyle: "italic", marginBottom: "0.7em" }}>
                custom alphabet
              </div>
              <Logo height="10em" glyphwidth={1.5} glyphmap={MULTINUMBER_GLYPHMAP} pwm={TRINUCLEOTIDE_PWM} startpos={1} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ textAlign: "center" }}>
            <Grid.Column width={16}>
              <Button as={Link} to="/gallery/dinucleotide">See More</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
);
export default DinucleotidePreview;
