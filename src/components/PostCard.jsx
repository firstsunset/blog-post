import { Card, DropdownButton } from 'react-bootstrap';
import UserAvatar from '../assets/user.png';

export default function PostCard({ title, description, children, handleOpen}) {

  return (
    <>
      <Card style={{ width: '25rem', height: '40rem', alignItems: 'center' }}>
        <Card.Body style={{ width: '25rem', height: 'auto'}}>
          <Card.Img variant="top" src={UserAvatar} style={{ width: 60, height: 60, marginBottom: 20,  }} />
          <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{title}</Card.Title>
          <Card.Text style={{ height: 120,  }} >{description}</Card.Text>
          <DropdownButton title='Comments' onClick={handleOpen}>
            {children}
          </DropdownButton>
        </Card.Body>
      </Card>
    </>
  );
}
