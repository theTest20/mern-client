import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../redux/features/authSlice';

import decode from 'jwt-decode';

const Header = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: '#1E1A22' }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: '#E9EAF4 ', fontWeight: '600', fontSize: '22px' }}
        >
          TechBlog
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => () => setShow(!show)}
          style={{ color: '#606080' }}
        >
         <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {token ? (
              <>
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/posts">
                  <p className="header-text">Add Post</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/myposts">
                  <p className="header-text">My Posts</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/me">
                  <p className="header-text">My profile</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text" onClick={() => handleLogout()}>
                    Log Out
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text">Log in</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/signup">
                    <p className="header-text"> Sign up</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
