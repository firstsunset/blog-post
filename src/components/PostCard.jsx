import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserAvatar from '../assets/user.png';

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function PostCard({title, description}) {
  return (
    <>
      <Card style={{ width: '25rem', height: '20rem', alignItems: 'center' }}>
        <Card.Body style={{ width: '25rem'}}>
          <Card.Img variant="top" src={UserAvatar} style={{ width: 60, height: 60, marginBottom: 20,  }} />
          <Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{title}</Card.Title>
          <Card.Text style={{ height: 120,  }} >{description}</Card.Text>
        </Card.Body>
      </Card>

      
    </>
  );
}
