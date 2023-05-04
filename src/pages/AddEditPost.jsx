import { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost, updatePost } from '../redux/features/postsSlice';



const AddEdit = () => {

 const [title, setTitle]=useState('');
 const [content, setContent]=useState('');
 const [file, setFile]=useState('');

  const { error, userPosts } = useSelector((state) => ({
    ...state.post,
  }));
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const post = userPosts.find((post) => post._id === id);
      setTitle(post.title);
      setContent(post.content);
      setFile(post.imageCover);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      
      const firstName=user?.data?.user.firstName
      const form=new FormData();
      
      form.append('title', title);
      form.append('content', content);
      form.append('imageCover', file);
      form.append('firstName', firstName)
      if (id) {
        dispatch(updatePost({ id, form, toast, navigate }));
      } else {
        dispatch(createPost({ form, navigate, toast }));
      }
      handleClear();
    }
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setFile('');
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? 'Update Post' : 'Add new Post'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ''}
                name="title"
                onChange={(e)=>setTitle(e.target.value)}
                className="form-control"
                required
                invalid
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Content"
                type="text"
                value={content}
                name="content"
                onChange={(e)=>setContent(e.target.value)}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide content"
              />
            </div>
            <div className="d-flex  justify-content-start">
              <MDBInput placeholder='Upload file'
                type="file"
                name={file}
                onChange={(e)=>setFile(e.target.files[0])}
                className="form-control"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: '100%' }}>
                {id ? 'Update' : 'Submit'}
              </MDBBtn>
              <MDBBtn
                style={{ width: '100%' }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
 
};

export default AddEdit;
