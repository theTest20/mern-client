import React, { useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, setCurrentPage } from '../redux/features/postsSlice';
import CardPost from '../components/CardPost';
import Spinner from '../components/Spinner';
import Pagination from '../components/Paginate';
const Home = () => {
  const { posts, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.post,
    })
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts(currentPage));
    // console.log(posts); //-->postet jane Ok
  }, [dispatch, currentPage]);
  //console.log(posts);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: '25px 50px',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center',
        height: '100px',
      }}
    >
      <MDBRow className="mt-5">
        {posts.length === 0 && (
          <MDBTypography className="text-center mt-10 mb-0" tag="h2">
            No Posts Found
          </MDBTypography>
        )}
        <MDBCol className="mb-4">
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2 mt-4">
              {posts &&
                posts.map((item) => <CardPost key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        {posts.length > 0 && (
          <Pagination
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        )}
      </MDBRow>
    </div>
  );
};

export default Home;
