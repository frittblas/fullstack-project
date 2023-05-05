import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { CanvasJSChart } from 'canvasjs-react-charts';
import APIHelper from '../../utilities/api-helper';
import { useApi } from '../../hooks/useApi';

export default function Statistics() {
  const api = useApi();
  const [data, setData] = useState([]);

  const [numberOfUsers, setNumberOfUsers] = useState();

  const [usersPerProgram, setUsersPerProgram] = useState([]);

  useEffect(() => {
    // Simulate API call and set the state
    const mockData = [
      { label: 'Economics', value: 10 },
      { label: 'Software Development', value: 20 },
      { label: 'Iot Engineers', value: 15 },
      { label: 'Business Administration', value: 25 },
      { label: 'HR', value: 30 },
    ];
    setData(mockData);
  }, []);

  useEffect(() => {
    async function fetchNumberOfUsers() {
      try {
        const data = await api.getNumberOfUsers();
        setNumberOfUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNumberOfUsers();
  }, []); 

  useEffect(() => {
    async function fetchUsersPerProgram() {
      try {
        const data = await api.getUsersPerProgram();
        setUsersPerProgram(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsersPerProgram();
  }, []);


  const pieOptions = {
    title: {
      text: 'Number of users',
    },
    data: [
      {
        type: 'pie',
        dataPoints: Array.isArray(usersPerProgram) ? usersPerProgram.map((item) => ({
          label: item.program,
          y: item.numberOfUsers,
        })) : [],
        
      },
    ],
  };

  const chartOptions = {
    title: {
      text: 'Number of posts',
    },
    data: [
      {
        type: 'column',
        dataPoints: data.map((item) => ({
          label: item.label,
          y: item.value,
        })),
      },
    ],
  };

  return (
    <>
      <Row className="d-flex flex-wrap justify-content-center">
        <Col className="mt-4 m-3" xs={10} sm={10} md={10} lg={10} xl={10}>
          <Card className="h-100">
            <Card.Header>User statistics</Card.Header>
            <Card.Body>
              <CanvasJSChart options={pieOptions} />
              <div>Total number of users: {numberOfUsers.users}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="d-flex flex-wrap justify-content-center">
        <Col className="mt-4 m-3" xs={10} sm={10} md={10} lg={10} xl={10}>
          <Card className="h-100">
            <Card.Header>Posts statistics</Card.Header>
            <Card.Body>
              <CanvasJSChart options={chartOptions} />
              <div>Total number of posts: 100</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
