import React, { useContext, Fragment, useState } from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';

import AddItemForm from './AddItemForm';
import { Label1 } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Plus, Menu as Burger } from 'baseui/icon';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useStyletron } from 'baseui';
import Menu from './Sidebar';
import { Block } from 'baseui/block';

export default function Nav() {
  const { isAuthenticated, user } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Block width={['100%', '100%', '50%']} margin="0 auto">
      <HeaderNavigation
        overrides={{
          Root: {
            style: {
              backgroundColor: 'black',
            },
          },
        }}
      >
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Button onClick={() => setIsMenuOpen(true)}>
              <Burger size={32} />
            </Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        {isAuthenticated ? (
          <Authenticated name={user?.name} />
        ) : (
          <Unauthenticated />
        )}
      </HeaderNavigation>
      <Menu setIsOpen={setIsMenuOpen} isOpen={isMenuOpen} />
    </Block>
    // <h1>Nav</h1>
  );
}

function Authenticated(props: any) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }
  return (
    <Fragment>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <div className={css({ paddingBottom: theme.sizing.scale300 })}>
            <Button endEnhancer={Plus} onClick={() => setIsOpen(true)}>
              New
            </Button>
          </div>
          {/* <Button kind="minimal" shape="round">
            <Plus size={32} />
          </Button> */}
        </StyledNavigationItem>
        {/* <StyledNavigationItem>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button>My List</Button>
          </Link>
        </StyledNavigationItem> */}
      </StyledNavigationList>
      <AddItemForm isOpen={isOpen} close={close} />
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
