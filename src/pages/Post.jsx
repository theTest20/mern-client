import  { useEffect} from 'react';
import noPhoto from './../images/noPhoto.png';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../redux/features/postsSlice';

const Post = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => ({ ...state.post }));
 

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

console.log(post)


  return (
    <>
      <MDBContainer className="mt-5">
        <MDBCard className="mb-3 mt-2">
          <div className='mx-auto mt-4' style={{width:'80%'}}>
          <MDBCardImage
            position="center"
            style={{ width: '100%', maxHeight: '480px' }}
            src={`http://localhost:5000/img/post/${post.imageCover}` || noPhoto}
            className='img-thumbnail img-fluid shadow-4 '
            alt={post.title}
            />
            </div>
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: 'left', color: '#000' }}
              onClick={() => navigate('/')}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: 'left' }}
              /> 
            </MDBBtn>
            <h3>{post.title}</h3>
            <div className="d-flex align-items-center m-0">
            {post.userImage && post.userImage.length > 0 ? (
                <MDBCardImage
                position="left"
                className="user-image" //userImage
                src={`http://localhost:5000/img/users/${post.userImage[0].photo}`}
                />
             ) : (
               <MDBIcon icon='user-alt' size='lg' style={{ marginRight: '5px' }} />
            )}          
           <div className="ml-3">
                  <p className="postName">
                    {post?.publisher?.firstName || 'deleted user'}
                  </p>
                </div>
            </div>
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: 'left', margin: '5px' }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(post.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {post.content}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Post;
