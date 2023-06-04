import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, Pagination, Form, Button } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { getPosts, getComments, getCurrentPage } from '../../store/posts/actions';
import { createPages } from '../../utils/pagesCreator';


export default function MainPage() {
  const dispatch = useDispatch();
  
  const { posts, loadingPosts } = useSelector((state) => state.PostReducer);

  const  { comments, loadingComments } = useSelector((state) => state.PostReducer);

  const  { currentPage } = useSelector((state) => state.PostReducer);

  const  { totalCount } = useSelector((state) => state.PostReducer);

  const  { perPage } = useSelector((state) => state.PostReducer);

  const [postId, setPostId] = useState(null);
  
  const [postComments, setPostComments] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [filteredPosts, setFilteredPosts] = useState([]);

  const pagesCount = Math.ceil(totalCount/perPage);
  
  const pages = []
  
  createPages(pages, pagesCount, currentPage); 

  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage])

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts])

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

const handleSubmit = (e) => {
  e.preventDefault();
  let value = searchValue.toLowerCase();
  let result = [];
  result = posts.filter((data) => {
  return data.title.search(value) !== -1;
});
setFilteredPosts(result);
}
      
  return (
    <>
      <h1>Posts</h1>
      <Form className="d-flex" onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <Form.Control 
          type="search" 
          className="me-2" 
          placeholder="Search" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '30%' }}
        />
        <Button variant="outline-success" type='submit' >Search</Button>
      </Form>
      <Row xs={1} md={2} className="g-4">
        { 
          filteredPosts.map((post) => {
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
        <Pagination>
          <Pagination.Prev />
          {
            pages.map((page, index) => {
              return (
                <Pagination.Item 
                  key={index} 
                  active={currentPage === page ? true : false} 
                  onClick={() => dispatch(getCurrentPage(page))}
                >{page}</Pagination.Item>
              )
            })
          }
          <Pagination.Next />
        </Pagination>
      </Row>
    </>
  );
}
