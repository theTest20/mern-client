import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const CardPost = ({ title, content, imageCover, _id }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + ' ...';
    }
    return str;
  };
  return (
    <MDBCardGroup>
      <MDBCard
        className="h-100 mt-2 d-sm-flex me-3 "
        style={{ maxWidth: '20rem' }}
      >
        <MDBCardImage
          src={imageCover}
          alt={title}
          position="top"
          style={{ maxWidth: '100%', height: '180px' }}
        />
        <MDBCardBody style={{ maxHeight: '12rem' }}>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(content)}
            <Link to={`/posts/${_id}`}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};
export default CardPost;
