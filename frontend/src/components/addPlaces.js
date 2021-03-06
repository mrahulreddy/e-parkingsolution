import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Container,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import SucessMessage from "./SucessMessage";
import ErrorMessage from "./ErrorMessage";

const AddPlaces = (props) => {
  const { symbol } = props;
  const [ownerMailId, setOemail] = useState("");
  const [ownerName, setOname] = useState("");
  const [placeName, setPname] = useState("");
  const [nos, setNos] = useState("");
  const [aph, setAph] = useState("");
  const [stime, setStime] = useState("00:00");
  const [etime, setEtime] = useState("23:00");
  const [sucess, setSucess] = useState();
  const [error, setError] = useState(false);

  let navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  const addingPlaces = async (e) => {
    e.preventDefault();
    setSucess(false);
    setError(false);

    console.log(ownerMailId, ownerName, placeName, nos, aph, stime, etime);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/addplaces",
        {
          ownerMailId,
          ownerName,
          placeName,
          nos,
          aph,
          stime,
          etime,
        },
        config
      );

      localStorage.setItem("addedPlace", JSON.stringify(data));
      e.target.reset();
      setStime("00:00");
      setEtime("24:00");
      navigate("/dashboard");
      // window.location.reload();
      setSucess("Successfully added the place");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    setOname(JSON.parse(userInfo).name);
    setOemail(JSON.parse(userInfo).email);
  }, []);
  return (
    <div>
      <Container>
        <Form onSubmit={addingPlaces}>
          <Form.Group className="mb-3">
            {sucess && <SucessMessage message={sucess} />}
            {error && <ErrorMessage message={error} />}
            <Row>
              <Col>
                <Form.Label>Place name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Place"
                  onChange={(e) => setPname(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Owner name</Form.Label>
                <Form.Control
                  type="text"
                  value={ownerName}
                  placeholder="Owner name "
                  onChange={(e) => setOname(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Owner MailId</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Mail id"
                  value={ownerMailId}
                  onChange={(e) => setOemail(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Label>Open time </Form.Label>
                <TimePicker
                  isOpen="true"
                  disableClock="true"
                  onChange={setStime}
                  value={stime}
                />
              </Col>
              <Col>
                <Form.Label>Close time</Form.Label>
                <TimePicker
                  isOpen="true"
                  disableClock="true"
                  onChange={setEtime}
                  value={etime}
                />
              </Col>
              <Col>
                <Form.Label>Number of slots</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter total parking bays"
                  onChange={(e) => setNos(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Amount Per Hour ({symbol})</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setAph(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Place
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddPlaces;
