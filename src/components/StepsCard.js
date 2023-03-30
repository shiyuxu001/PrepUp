import React from "react";
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// color reference:
//    https://react-bootstrap.github.io/components/cards/#background-color

function StepsCard(props) {
  const handleClick = () => {
    props.onClick()
    console.log('checkbox is clicked')
  }

  return (
    // <Card bg = {props.color} style={{ height: '7rem', margin: '6px', outlineStyle:'none'}}>
    //   <Card.Body>{props.text}</Card.Body>
    //   <Form.Check type="checkbox" label="Checkbox label"
    //     />
    // </Card>
    <Card bg = {props.color} style={{ margin: '6px', border:'none'}}>
      <Card.Body>
        <Row >
          <Col>
            {/* <Card.Text>{props.num}</Card.Text> */}
            <Card.Text className="text-start" style={{ fontSize: "1.5rem", fontWeight:"bolder"}}>Step {props.stepNum}</Card.Text>
          </Col>
          <Col xs="auto">
            <Form.Check type="checkbox" style={{scale:'1.7'}} aria-label="completed step checkbox" onClick={handleClick}/>
          </Col>
        </Row>
        <Row>
          {/* {props.text} */}
          <Card.Text className="text-start ms-3" style={{ }}>{props.text}</Card.Text>       
        </Row>
      </Card.Body>
      <Card.Text className="text-start mb-3 ms-3" style={{}}>{props.mins? props.mins +' minutes' : "5-10 minutes"}</Card.Text> 

    </Card>
  );
}

export default StepsCard;