import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useApi } from '../../hooks/useApi';
import Spinner from 'react-bootstrap/Spinner';

export default function Statistics() {
  const api = useApi();
  const [isInitLoad, setInitLoad] = useState(true);
  const [numberOfUsers, setNumberOfUsers] = useState();
  const [numberOfPosts, setNumberOfPosts] = useState();
  const [usersPerProgram, setUsersPerProgram] = useState([]);
  const [postsPerProgram, setPostsPerProgram] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await api.getUsersPerProgram();
      const posts = await api.getPostsPerProgram();
      const numberOfUsers = await api.getNumberOfUsers();
      const numberOfPosts = await api.getNumberOfPosts();
      setUsersPerProgram(users);
      setPostsPerProgram(posts);
      setNumberOfUsers(numberOfUsers);
      setNumberOfPosts(numberOfPosts);
      setInitLoad(false);
    })();
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
    axisX: {
      labelAngle: 270
    },
    data: [
      {
        type: 'column',
        dataPoints: Array.isArray(postsPerProgram) ? postsPerProgram.map((item) => ({
          label: item.program,
          y: item.numberOfPosts,
        })) : [],
      },
    ],
  };

  return (
    <>
             {isInitLoad ? (
        <div className="spinner-wrap">
          <Spinner animation="border" />
        </div>
      ) : (
          <>
      <Row className="d-flex flex-wrap justify-content-center">
        <Col className="mt-4 m-3" xs={10} sm={10} md={10} lg={10} xl={10}>
          <Card className="h-100">
            <Card.Header>User statistics</Card.Header>
            <Card.Body>
              <CanvasJSChart options={pieOptions} />
              <div>Total number of users: {numberOfUsers?.users || ""}</div>
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
              <div>Total number of posts: {numberOfPosts?.posts || ""}</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     </>
          
     )}
     
    </>
  );
}
