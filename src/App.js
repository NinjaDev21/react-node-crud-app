import React, { Component } from 'react';
import AllBookList from './AllBookList';

import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Row>
          <Col> <h1> Book library  </h1> </Col>
        </Row>                
        <AllBookList />        
      </Container>

    );
  }
}

export default App;
