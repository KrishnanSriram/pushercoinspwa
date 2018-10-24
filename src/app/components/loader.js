import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default () => (
  <div>
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>
);