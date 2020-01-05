import * as React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';
import { withRouter, Link } from 'react-router-dom';

export default function Nav() {
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <StyledNavigationItem>Kipin</StyledNavigationItem>
        </Link>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <StyledLink>Login</StyledLink>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button>Get started</Button>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
}

function CustomLink() {}
