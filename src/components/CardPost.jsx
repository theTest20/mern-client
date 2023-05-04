import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


const CardPost = ({ posts}) => {
  const excerpt = (str) => {
    if (str.length > 55) {
      str = str.substring(0, 50) + '... ';
    }else{
      str=str+'... ';
    }
    return str;
  };
 
  return(
  <div >
    {posts.map((item)=>( 
    <MDBCard key={item._id} className='shadow-0 border-bottom p-3' style={{ width: 'auto'}}>
      <MDBRow className='g-0'>
      <MDBCol md='3'>
        <MDBCardImage src={`http://localhost:5000/img/post/${item.imageCover}`} alt={item.title} fluid />
      </MDBCol>
      <MDBCol md='9'>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
          <MDBCardText>
          {excerpt(item.content)}
          <Link to={`/posts/${item._id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCol>
      </MDBRow>
    </MDBCard>))}
  </div>
  )
};
export default CardPost;
