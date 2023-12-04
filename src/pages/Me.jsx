import { useState, useEffect } from 'react';
import {
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBCardImage,
   MDBIcon,
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserInfo,
  updateUserPassword,
  deleteMe,
} from '../redux/features/authSlice';
import { toast } from 'react-toastify';

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
 
 
  const [firstName, setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [email, setEmail]=useState('');
  const [file, setFile]=useState('');
 
  const [inputPassword, setPassword] = useState(initialState2);
  const { passwordCurrent, password, passwordConfirm } = inputPassword;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  
  useEffect(() => {
    if (user) {
      setFile(user.data.user.photo);
    }
  }, [user]);
  
  useEffect(() => {
    error && toast.error(error);
  }, [error]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName || lastName || email || file ) {
      const formDatas=new FormData(); 
      formDatas.append('firstName', firstName);
      formDatas.append('lastName', lastName);
      formDatas.append('photo', file);
      
      dispatch(updateUserInfo({ formDatas, toast, navigate }));
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (passwordCurrent && password && passwordConfirm) {
      const newPassword = {
        ...inputPassword,
      };
      dispatch(updateUserPassword({ newPassword, toast, navigate }));
    }
  };
 
  const onInputChange2 = (e) => {
    let { name, value } = e.target;
    setPassword({ ...inputPassword, [name]: value });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteMe({ navigate, toast }));
    }
  };
  
 return (
    <MDBContainer  style={{
            marginTop: '150px',
            padding: '15px',
            width:'auto',
            height:'auto'
          }}
         className="shadow-4" >
      <MDBRow>
        <h3>Your account settings</h3>
        <MDBCol size='3' className="square border border-start-0 border-info border-3 ms-3" style={{margin:'5px', padding:'7px'}}>
        {file? <MDBCardImage
            position="center"
            style={{ width: '50%'}}
            src={`http://localhost:5000/img/users/${file}`}
            alt={user.data.user.firstName}
          />: <MDBIcon icon='user-alt' size='lg'/>}
        <div className='mt-2'>
         <p className='mb-1'>{user.data.user.firstName} {user.data.user.lastName}</p>
         <p>{user.data.user.email}</p>
        </div>
        </MDBCol>
        <MDBCol size='5' style={{margin:'5px', padding:'7px'}}>
        <MDBValidation onSubmit={handleSubmit} noValidate >
        <div className='d-flex mt-1 mb-2 justify-content-between'>
        <MDBInput
          label="First Name"
          type="text"
          value={firstName}
          name="firstName"
          onChange={(e)=>setFirstName(e.target.value)}
         />
         <MDBInput
          label="Last Name"
          type="text"
          value={lastName}
          name="lastName"
          onChange={(e)=>setLastName(e.target.value)}
        />
        </div>
         <MDBInput
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={(e)=>setEmail(e.target.value)}
          className='mb-2'
        />   
        <div className="text-start">Change photo</div>       
        <MDBInput placeholder='Upload file'
          type="file"
          name={file}
          onChange={(e)=>setFile(e.target.files[0])}
          className="form-control mb-2"
        />    
        <MDBBtn style={{ width: '100%' }} className="mt-2">
          {loading && (
            <MDBSpinner
                size="sm"
                role="status"
                tag="span"
                className="me-2"
            />
          )}
          Save
        </MDBBtn> 
        </MDBValidation>     
        </MDBCol>
        <MDBCol size='3' className="square border-start ms-3 ps-3 border-2" style={{margin:'5px', padding:'7px'}}>
        <h5>Change password</h5>
         <MDBValidation
            onSubmit={handleSubmitPassword}
            noValidate
           
          >
            <MDBInput
              label="Current Password"
              type="password"
              value={passwordCurrent}
              name="passwordCurrent"
              onChange={onInputChange2}
              required
              invalid
              validation="Please provide your current password"
              className='mt-1 mb-2 '
            />         
            <MDBInput
              label=" New password"
              type="password"
              value={password}
              name="password"
              onChange={onInputChange2}
              required
              invalid
              validation="Please provide new password"
              className='mb-2 '
            />      
            <MDBInput
              label="Confirm new password"
              type="password"
              value={passwordConfirm}
              name="passwordConfirm"
              onChange={onInputChange2}
              required
              invalid
              validation="Confirm new password does not match with new password!"
              className='mb-2 '
            />        
            <MDBBtn style={{ width: '100%' }} className="mt-2">
              {loading && (
               <MDBSpinner
                size="sm"
                role="status"
                tag="span"
                />
              )}
              Save
            </MDBBtn> 
          </MDBValidation>
        </MDBCol>
    </MDBRow>
    <MDBRow className='mt-4 mb-1 d-flex justify-content-center'>
      <hr
        style={{
          color: 'black',
          backgroundColor: 'black',
          height: 3,
          width:'90%',
        }}
      />
      <p> or
        <button style={{
         border: 'none',
         background:"none",
         color:'blue'
        }} onClick={() => handleDelete()}>
           Delete Account?
        </button>
      </p>   
    </MDBRow>
    </MDBContainer>
  );
};

export default Me;
