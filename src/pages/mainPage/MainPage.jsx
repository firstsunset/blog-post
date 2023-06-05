import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, Pagination, Form, Button, InputGroup, Stack } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { getPosts, getComments, getCurrentPage, sortPost } from '../../store/posts/actions';
import { createPages } from '../../utils/pagesCreator';


export default function MainPage() {
  const dispatch = useDispatch();
  
  const { posts, loadingPosts, pageLimit, currentPage, paginationMode } = useSelector((state) => state.PostReducer);

  const  { comments, loadingComments } = useSelector((state) => state.PostReducer);

  const  { totalCount } = useSelector((state) => state.PostReducer);

  // const  { perPage } = useSelector((state) => state.PostReducer);

  const [postId, setPostId] = useState(null);
  
  const [postComments, setPostComments] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [filteredPosts, setFilteredPosts] = useState([]);

  const pagesCount = Math.ceil(totalCount/pageLimit);
  
  const pages = []
  
  createPages(pages, pagesCount, currentPage);
  
  useEffect(() => {
    dispatch(getPosts({ start: 0, end: 10, currentPage: 0}));
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
  };

  const handleSort = () => {
    dispatch(sortPost('title'));
  };

  const handleClearSearch = () => {
    dispatch(getPosts({ start: 0, end: 10, currentPage: 0}));
    setSearchValue('');
  };

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <>
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Next 
            onClick={() => 
              dispatch(getPosts({
                start: (currentPage + 1) * 10,
                end: (currentPage + 2) * 10,
                currentPage: 1,
              }))
            }
          />
        </>
      )
    } else if (currentPage < pageLimit - 1 && posts.length === pageLimit ) {
      return (
        <>
          <Pagination.Prev
            onClick={() => 
            dispatch(getPosts({
              start: (currentPage - 1) * 10,
              end: currentPage * 10,
              currentPage: -1,
            }))
          }
          />
            {
              pages.map((page, index) => {
                return (
                  <Pagination.Item 
                    key={index} 
                    active={currentPage === page} 
                    onClick={() =>{
                      console.log('page', page);
                      dispatch(getPosts({
                        start: (page - 1) * 10,
                        end: page * 10,
                        currentPage: 0
                      }))}
                    } 
                      
                  >{page + 1}</Pagination.Item>
                )
              })
            }
            {/* <Pagination.Item active >{currentPage + 1}</Pagination.Item> */}
          <Pagination.Next
            onClick={() => 
              dispatch(getPosts({
                start: (currentPage + 1) * 10,
                end: (currentPage + 2) * 10,
                currentPage: 1,
              }))
            }
          />
        </>
      )
    } else {
      <>
        <Pagination.Prev
          onClick={() => 
            dispatch(getPosts({
              start: (currentPage - 1) * 10,
              end: currentPage * 10,
              currentPage: -1,
            }))
          }
        />
        <Pagination.Item>{currentPage + 1}</Pagination.Item>
      </>
    }
  };
      
  return (
    <>
      <h1>Posts</h1>
      <Stack direction="horizontal" style={{ marginBottom: 30, justifyContent: 'space-between' }} >
        <Form className="d-flex" onSubmit={handleSubmit} style={{ justifyContent: 'space-between' }}>
          <InputGroup style={{ marginRight: 20 }} >
            <Form.Control 
              type="search" 
              placeholder="Search" 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button style={{
              border: '1px solid #ced4da',
              backgroundColor: 'transparent',
              borderLeft: 'none',
              color: '#212529'
              }}
              onClick={handleClearSearch}
            >X</Button>
          </InputGroup>
          <Button variant="outline-success" type='submit'>Search</Button>
        </Form>
        <Stack direction="horizontal" gap={3}>
          <Button variant="outline-success" onClick={handleSort} >Sort by posts title</Button>
            <div className="vr" />
          <Button variant="outline-danger" onClick={() => dispatch(getPosts({ start: 0, end: 4, currentPage: 0}))}>Reset</Button>
        </Stack>
      </Stack>
      
      <Row xs={1} md={2} className="g-4">
        { 
          filteredPosts.map((post) => {
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
        <Pagination>
          <>{renderPagination()}</>
          {/* <Pagination.Prev
            onClick={() => 
            dispatch(getPosts({
              start: (currentPage - 1) * 10,
              end: currentPage * 10,
              currentPage: -1,
            }))
          }
          />
            {
              pages.map((page, index) => {
                return (
                  <Pagination.Item 
                    key={index} 
                    active={currentPage === page} 
                    onClick={() =>{
                      console.log('page', page);
                      dispatch(getPosts({
                        start: (page - 1) * 10,
                        end: page * 10,
                        // currentPage: 
                      }))}
                    } 
                      
                  >{page}</Pagination.Item>
                )
              })
            }
          <Pagination.Next
            onClick={() => 
              dispatch(getPosts({
                start: (currentPage + 1) * 10,
                end: (currentPage + 2) * 10,
                currentPage: 1,
              }))
            }
          /> */}
        </Pagination>
      </Row>
    </>
  );
}
