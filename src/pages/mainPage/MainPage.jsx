import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Navbar, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PostCard from '../../components/PostCard';
import { getPosts } from '../../store/posts/actions';


export default function MainPage() {
  const { posts, loadingPosts } = useSelector((state) => state.PostReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [])
  
console.log(posts);

  return (
    <>
      <h1>Posts</h1>
      <Row xs={1} md={2} className="g-4">
        { 
          posts.map((post) => {
            return (
                <Col key={post.id}>
                  <PostCard  title={post.title} description={post.body} />
                </Col>
            )
            
          })
        }
      </Row>
      
      
    </>
  );
}
