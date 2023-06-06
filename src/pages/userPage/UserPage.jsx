import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Row, Col, Card, Stack, Button } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { getUserDetails, getUsersPosts } from '../../store/users/actions';
import { getComments } from '../../store/posts/actions';

export default function UserPage() {
  const dispatch = useDispatch();
  
  const { id } = useParams();

  const { user, posts } = useSelector((state) => state.UserReducer);

  const  { comments, loadingComments } = useSelector((state) => state.PostReducer);

  const { name, email, address} = user;

  const [postId, setPostId] = useState(null);
  
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getUsersPosts(id))
    }
  }, [])

  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
    
    if (comments ) {
      setPostComments(comments);
    }
  }, [postId, postComments]);

  const handleGetComments = (id) => {
    setPostId(id);    
  }
  
      
  return (
    <Stack>
      <Stack direction='row'>
        <h1>Name</h1>
        <p>{name}</p>
      </Stack>
      <Stack direction='row'>
        <h1>Email</h1>
        <p>{email}</p>
      </Stack>
      <Stack direction='row'>
        <h1>Address</h1>
        <p>{address?.city} {address?.street} {address?.suite}</p>
      </Stack>
      <Row xs={1} md={2} className="g-4">
        { 
          posts?.map((post) => {
            return (
              <Col key={post.id}>
                <PostCard 
                  title={post.userId + post.title} 
                  description={post.body} 
                  userId={post.userId}
                  handleOpen={() => handleGetComments(post.id)}
                >
                  <div style={{ height: '19rem', overflowY: 'auto' }}>
                    {
                      (comments?.length > 0 && comments[0].postId === post.id) &&
                      comments.map((comment, index) => {
                        return(
                          <Card key={index} style={{ border: 'none' }}>
                            <Card.Body>
                              <Card.Title>{comment.email}</Card.Title>
                              <Card.Text>{comment.body}</Card.Text>
                            </Card.Body>
                          </Card>
                        )
                      })
                    }
                  </div>
                </PostCard>
              </Col>
            )
          })
        }
      </Row>
      <Link to={'/'} style={{ marginTop: 20, marginBottom: 20 }} >
        <Button>Back</Button>
      </Link>
    </Stack>
  );
}
