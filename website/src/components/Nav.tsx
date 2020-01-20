import React, { useContext, Fragment, PropsWithChildren } from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from 'baseui/header-navigation';
import { Label1 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { withRouter, Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import { User } from 'types';

export default function Nav() {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <StyledNavigationItem>Kipin</StyledNavigationItem>
        </Link>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      {isAuthenticated ? <HelloUser name={user?.name} /> : <Unauthenticated />}
    </HeaderNavigation>
    // <h1>Nav</h1>
  );
}

function HelloUser(props: any) {
  return (
    <Fragment>
      <h1>Hello {props.name}</h1>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button>My List</Button>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
    </Fragment>
  );
}

function Unauthenticated() {
  return (
    <Fragment>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Label1>Log In</Label1>
          </Link>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button>Sign Up</Button>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
    </Fragment>
  );
}

function CustomLink() {}
