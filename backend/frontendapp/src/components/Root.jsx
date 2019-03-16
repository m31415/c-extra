import React from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Container from 'react-bootstrap/lib/Container';
import HeaderNavigation from './Nav.jsx';
import Graph from './Graph.jsx';


export default function Root() {
  return (
    <Container fluid="True" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row className="show-grid">
        <Col>
          <HeaderNavigation />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col>
          <Graph />
        </Col>
      </Row>
    </Container>
  );
}
