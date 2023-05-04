import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { singUp } from '../redux/features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValues, setValues] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { firstName, lastName, email, password, passwordConfirm } = inputValues;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error('Password and Confirm Password should match!');
    }
    if (firstName && lastName && email && password && passwordConfirm) {
      dispatch(singUp({ inputValues, navigate, toast }));
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
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide last name"
              />
            </div>
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
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={onInputChange}
                required
                invalid
                validation="Confirm Password does not match with Password!"
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
                Sing Up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <p>Already have an account?</p>
          <Link to="/login">
            <p>Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Signup;
