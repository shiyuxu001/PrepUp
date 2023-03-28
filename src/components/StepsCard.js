import React from "react";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// color reference:
//    https://react-bootstrap.github.io/components/cards/#background-color

function StepsCard(props) {
  return (
    // <Card bg = {props.color} style={{ height: '7rem', margin: '6px', outlineStyle:'none'}}>
    //   <Card.Body>{props.text}</Card.Body>
    //   <Form.Check type="checkbox" label="Checkbox label"
    //     />
    // </Card>
    <Card bg = {props.color} style={{ height: '7rem', margin: '6px', border:'none'}}>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>{props.text}</Card.Text>
          </Col>
          <Col xs="auto">
            <Form.Check type="checkbox" aria-label="completed step checkbox" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default StepsCard;