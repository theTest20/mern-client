import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
// import {
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
// } from '@material-ui/core/';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../redux/features/postsSlice';
// import useStyles from './styles';
const Post = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => ({ ...state.post }));

  console.log(post);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getPost(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // console.log(post);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: '90%', maxHeight: '600px' }}
            src={post.imageCover}
            alt={post.title}
          />
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
            <span>
              <p className="text-start postName">
                Published by: {post?.publisher?.firstName}
              </p>
            </span>
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
