import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card} from 'material-ui/Card';
import Applied from '../applied';
import Accepted from '../accepted';
import Denied from '../denied';


class Total extends React.Component{
  render() {
    return (
      <Card style={{height:"90vh"}}>
        <Tabs>
          <Tab label="Applied">
            <Applied />
          </Tab>
          <Tab label="Accepted">
            <Accepted />
          </Tab>
          <Tab label="Denied">
            <Denied />
          </Tab>
          <Tab label="Confirmed">
            
          </Tab>
          <Tab label="Deferred">
            
          </Tab>
        </Tabs>
      </Card>
    );
  }
}

export default Total;