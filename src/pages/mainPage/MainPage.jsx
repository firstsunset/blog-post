import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { getPosts, getComments } from '../../store/posts/actions';


export default function MainPage() {
  const dispatch = useDispatch();
  
  const { posts, loadingPosts } = useSelector((state) => state.PostReducer);

  const  { comments, loadingComments } = useSelector((state) => state.PostReducer);

  const [postId, setPostId] = useState(null);
  
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [])

  const handleGetComments = (id) => {
    setPostId(id);    
  }
  
  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
    
    if (comments ) {
      setPostComments(comments);
    }
  }, [postId, postComments]);
      
  return (
    <>
      <h1>Posts</h1>
      <Row xs={1} md={2} className="g-4">
        { 
          posts.map((post) => {
            return (
              <Col key={post.id}>
                <PostCard 
                  title={post.title} 
                  description={post.body} 
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
    </>
  );
}
