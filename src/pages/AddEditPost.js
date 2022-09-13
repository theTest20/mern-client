import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { createPost } from '../redux/features/postsSlice';
import { updatePost } from '../redux/features/postsSlice';

const initialState = {
  title: '',
  content: '',
};
const AddEdit = () => {
  const [postData, setPostData] = useState(initialState);

  const { error, userPosts } = useSelector((state) => ({
    ...state.post,
  }));
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, content } = postData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const post = userPosts.find((post) => post._id === id);
      console.log(post);
      setPostData({ ...post });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const dataPost = { ...postData, name: user?.data?.user?.firstName };

      if (!id) {
        dispatch(createPost({ dataPost, navigate, toast }));
      } else {
        console.log(dataPost); //new data
        dispatch(updatePost({ id, dataPost, toast, navigate }));
      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handleClear = () => {
    setPostData({ title: '', content: '' });
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
        <h5>{id ? 'Update Post' : 'Add Post'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <MDBInput
                placeholder="Enter Title"
                type="text"
                value={title || ''}
                name="title"
                onChange={onInputChange}
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
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide content"
              />
            </div>
            <div className="d-flex  justify-content-start">
              {
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, imageCover: base64 })
                  }
                />
              }
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
//te line 128 e fshiva butonin submit se i tepert
export default AddEdit;
