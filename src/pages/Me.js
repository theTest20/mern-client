import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';

//import FileBase from 'react-file-base64';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserInfo,
  updateUserPassword,
} from '../redux/features/authSlice';
import { toast } from 'react-toastify';
const initialState1 = {
  firstName: '',
  lastName: '',
  email: '',
};
const initialState2 = {
  passwordCurrent: '',
  password: '',
  passwordConfirm: '',
};
const Me = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const [inputValues, setValues] = useState(initialState1);
  const [inputPassword, setPassword] = useState(initialState2);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { firstName, lastName, email } = inputValues;
  const { passwordCurrent, password, passwordConfirm } = inputPassword;
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName || lastName || email) {
      const newDatas = {
        ...inputValues,
      };
      //console.log(newDatas);
      dispatch(updateUserInfo({ newDatas, toast, navigate }));
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (passwordCurrent && password && passwordConfirm) {
      const newPassword = {
        ...inputPassword,
      };
      console.log(newPassword);
      dispatch(updateUserPassword({ newPassword, toast, navigate }));
    }
  };
  const onInputChange1 = (e) => {
    let { name, value } = e.target;
    setValues({ ...inputValues, [name]: value });
  };
  const onInputChange2 = (e) => {
    let { name, value } = e.target;
    setPassword({ ...inputPassword, [name]: value });
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
        <h5>Your account settings</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange1}
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
                onChange={onInputChange1}
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
                onChange={onInputChange1}
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
                Save Settings
              </MDBBtn>
              <hr
                style={{
                  color: 'black',
                  backgroundColor: 'black',
                  height: 5,
                }}
              />
            </div>
          </MDBValidation>
          <MDBValidation
            onSubmit={handleSubmitPassword}
            noValidate
            className="row g-3"
          >
            <div className="col-md-12">
              <MDBInput
                label="Current Password"
                type="password"
                value={passwordCurrent}
                name="passwordCurrent"
                onChange={onInputChange2}
                required
                invalid
                validation="Please provide your current password"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange2}
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
                onChange={onInputChange2}
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
                Save Password
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Me;
