import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export default function Unauthorised() {
  return (
    <Alert variant="danger">
      <Alert.Heading>Unauthorised Access</Alert.Heading>
      <p>
        It looks like you are trying to access restricted resources without being authorised to do so. 
        If you consider this to be an error, please contact administrator.
        Otherwise you can get back to forum by clicking the link below.
      </p>
      <hr />
      <p className="mb-0">
        <Alert.Link as={Link} to="/users">Go to Posts</Alert.Link>
      </p>
    </Alert>
  )
}