import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { useApi } from '../../hooks/useApi';

export default function About() {
  const api = useApi();
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const data = await api.getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAboutData();

  }, []);


  return (
    <>
      <Row className="d-flex flex-wrap justify-content-center" >
        {aboutData.map((dataItem) => (
          <Col className="mt-4 m-3" xs={10} sm={8} md={5} lg={3} xl={3} key={dataItem._id}>
          <Card className="h-100">
          <Image src="../../../public/user.jpeg"  />
          <Card.Header>{dataItem.name}</Card.Header>
            <Card.Body>
            <Card.Text style={{fontWeight: 'bold'}}>{dataItem.title}</Card.Text>
            <Card.Text className="d-flex align-items-start">{dataItem.comment}</Card.Text>
          </Card.Body>
            </Card>
      </Col>
      ))}
      </Row>
    </>
  )
}