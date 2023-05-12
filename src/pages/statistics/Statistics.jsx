import { useState, useEffect } from 'react';
import { Tab, Tabs, Card, Col, Row, Image } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   CategoryScale, LinearScale, BarElement, Title, } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useApi } from '../../hooks/useApi';
import Spinner from 'react-bootstrap/Spinner';
import './Statistics.css';

export default function Statistics() {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
      const numberOfPosts = await api.getNumberOfPosts();
      const numberOfUsers = await api.getNumberOfUsers();
      setUsersPerProgram(users);
      setPostsPerProgram(posts);
      setNumberOfUsers(numberOfUsers);
      setNumberOfPosts(numberOfPosts);
      setInitLoad(false);
    })();
  }, []);

  const usersData = {
    labels: usersPerProgram.map(i => i.program),
    datasets: [
      {
        label: '# of Users',
        data: usersPerProgram.map(i => i.numberOfUsers),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const postsData = {
    labels: postsPerProgram.map(p => p.program),
    datasets: [
      {
        label: "Posts in Program",
        data: postsPerProgram.map(i => i.numberOfPosts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }
    ],
  };

  const postOptions = {
    plugins: {
      legend: {
        display:false,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
      responsive: true,
      maintainAspectRatio: true
    },
  };

  return (
    <div id="stats-page">
      {isInitLoad ? (
        <div className="spinner-wrap">
          <Spinner animation="border" />
        </div>
        ) : (
        <Tabs
        defaultActiveKey="posts-stts"
        id="uncontrolled-tab"
        className="mb-3">
          <Tab eventKey="posts-stts" title="Posts">
            <Bar data={postsData} options={postOptions}/>
              <div>
                <h4>
                  Total number of posts: {numberOfPosts?.posts || ""}
                </h4>
              </div> 
          </Tab>
            <Tab eventKey="users-stts" title="Users">
              <Doughnut data={usersData} />
              <div>
                <h4>
                  Total number of Users: {numberOfUsers.users || ""}
                </h4>
              </div> 
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
