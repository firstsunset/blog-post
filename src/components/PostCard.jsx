import { Card, DropdownButton, Spinner } from 'react-bootstrap';
import UserAvatar from '../assets/user.png';
import { Link } from 'react-router-dom';

export default function PostCard({ title, description, children, handleOpen, userId}) {

  return (
    <>
      <Card md={{ width: '40vw', height: '40rem', alignItems: 'center' }}>
        <Card.Body style={{ height: '30rem'}}>
          <Link to={`/users/${userId}`} >
            <Card.Img variant="top" src={UserAvatar} style={{ width: 60, height: 60, marginBottom: 20,  }} />
          </Link>
          <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{title}</Card.Title>
          <Card.Text >{description}</Card.Text>
          <DropdownButton title='Comments' onClick={handleOpen}>
            {children}
          </DropdownButton>
        </Card.Body>
      </Card>
    </>
  );
}
