import { getAboutData } from '../../services/api';
import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';

export default function About() {

  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAboutData();

  }, []);


  return (
    <>
      <Row >
        {aboutData.map((dataItem) => (
          <Col className="mt-4" sm={6} md={6} lg={4} xl={2} key={dataItem._id}>
          <Card>
          <Image src="../../../public/user.jpeg"  />
          <Card.Header>{dataItem.name}</Card.Header>
            <Card.Body>
            <Card.Text style={{fontWeight: 'bold'}}>{dataItem.title}</Card.Text>
            <Card.Text>{dataItem.comment}</Card.Text>
          </Card.Body>
            </Card>
      </Col>
      ))}
      </Row>
    </>
  )
}