import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { emailForgotPassword } from '../redux/features/authSlice';
const initialState = {
  email: '',
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [inputValues, setValues] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  console.log(inputValues);
  const { email } = inputValues;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(emailForgotPassword({ inputValues, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...inputValues, [name]: value });
  };
  return (
    <div
      style={{
        margin: 'auto',
        marginTop: '120px',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
      }}
    >
      <MDBCard alignment="center">
        <h5>Please enter your email account </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: '100%' }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Send
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default ForgotPassword;
