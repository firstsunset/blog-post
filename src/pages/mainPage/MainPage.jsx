import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, Pagination, Form, Button, InputGroup, Stack, Spinner } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import { getPosts, getComments, sortPost } from '../../store/posts/actions';
import { createPages } from '../../utils/pagesCreator';
import useDebounce from '../../utils/useDebounse';


export default function MainPage() {
  const dispatch = useDispatch();
  
  const { posts, loadingPosts, pageLimit, currentPage, totalCount, comments, loadingComments, error } = useSelector((state) => state.PostReducer);

  const [postId, setPostId] = useState(null);
  
  const [postComments, setPostComments] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [filteredPostsCount, setFilteredPostsCount] = useState(totalCount);

  const [activePage, setActivePage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const debouncedValue = useDebounce(isLoading, 500);

  const pagesCount = Math.ceil(filteredPostsCount/pageLimit);

  const pages = [];

  createPages(pages, pagesCount, currentPage);
  
  useEffect(() => {
    dispatch(getPosts({ start: 0, end: 10, currentPage: 0}));
    if (currentPage === 0) {
      setActivePage(1);
    } else { 
      setActivePage(currentPage);
    }
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

  useEffect(() => {
    if (loadingComments || loadingPosts) {
      setIsLoading(true);
    };
    if (debouncedValue) {
      setIsLoading(false);
    }
  }, [loadingComments, loadingPosts, debouncedValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let value = searchValue.toLowerCase();
    let result = [];
    result = posts.filter((data) => {
    return data.title.search(value) !== -1;
  });
    setFilteredPosts(result);
    setFilteredPostsCount(filteredPosts.length)
  };

  const handleSort = () => {
    dispatch(sortPost({ value: 'title', start: 0, end: 10}));
  };

  const handleClearSearch = () => {
    dispatch(getPosts({ start: 0, end: 10, currentPage: 0}));
    setSearchValue('');
    setFilteredPostsCount(totalCount);
  };

  const handleResetSort = ()  => {
    dispatch(getPosts({ start: 0, end: 10, currentPage: 0}));
    setActivePage(1);
    setFilteredPostsCount(totalCount);
  }
      
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
          <Button variant="outline-danger" onClick={handleResetSort}>Reset</Button>
        </Stack>
      </Stack>
      
      <Row xs={1} md={2} className="g-4" style={{ marginBottom: 20 }}  >
        { isLoading ?
          <Spinner animation="border" variant="primary" />
          :
          filteredPosts?.map((post) => {
            return (
              <Col key={post.id}>
                <PostCard 
                  title={post.userId + post.title} 
                  description={post.body} 
                  userId={post.userId}
                  handleOpen={() => handleGetComments(post.id)}
                >
                  {
                    // isLoading ?
                    // <Spinner animation="border" variant="primary" />
                    // :
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
                  }
                </PostCard>
              </Col>
            )
          })
        }
        { (filteredPosts?.length > 9) &&
          <Pagination>
            {
              pages?.map((page, index) => {
                return (
                  <Pagination.Item 
                    key={index} 
                    active={activePage === page} 
                    onClick={() => {
                      setActivePage(page)
                      dispatch(getPosts({
                        start: (page - 1) * pageLimit,
                        end: page * pageLimit,
                        currentPage: 0
                      }))}
                    } 
                  >{page}</Pagination.Item>
                )
              })
            }
          </Pagination>
        }
      </Row>
    </>
  );
}
