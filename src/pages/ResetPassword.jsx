import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { resetForgotPassword } from '../redux/features/authSlice';

const initialState = {
  password: '',
  passwordConfirm: '',
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [inputValues, setValues] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { password, passwordConfirm } = inputValues;
  const [token, setToken] = useState();

  const to = useParams();
  const tok = to.token;
  useEffect(() => {
    if (tok) {
      setToken(tok);
    }
  }, [tok]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error('Password should match!');
    }
    if (password && passwordConfirm) {
      dispatch(resetForgotPassword({ inputValues, token, toast }));
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
        <h4>Enter Your New Password</h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="New password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                validation="Please enter new password!"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Confirm new password"
                type="password"
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={onInputChange}
                required
                invalid
                validation="Passwords does not match!"
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
                Reset
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default ResetPassword;
