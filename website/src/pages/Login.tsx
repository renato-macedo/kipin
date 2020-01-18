import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron, styled } from 'baseui';
import AuthContext from '../context/auth/AuthContext';

const Container = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  margin: '5% auto'
});

export default function Login(props: any) {
  const { login, error, clearErrors, loadUser, isAuthenticated } = useContext(
    AuthContext
  );
  const [css, theme] = useStyletron();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    login({ email, password });
    // console.log(event, email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
    // if (error === 'Invalid Credentials') {
    //   alert(error);
    //   //setAlert(error, 'danger');
    //   //clearErrors();
    // }
  }, [error, isAuthenticated]);

  return (
    <Container onSubmit={handleSubmit}>
      <Card
        title="Login"
        overrides={{
          Title: { style: { textAlign: 'center' } },
          Root: { style: { width: '30%' } }
        }}
      >
        <StyledBody>
          <FormControl label="Email">
            <Input
              value={email}
              type="text"
              placeholder="Email"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setEmail(event.currentTarget.value)
              }
              clearable
            />
          </FormControl>
          <FormControl label="Password">
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword(event.currentTarget.value)
              }
            />
          </FormControl>
        </StyledBody>

        <StyledAction>
          <Button
            overrides={{ BaseButton: { style: { width: '100%' } } }}
            type="submit"
          >
            Login
          </Button>
          <StyledLink style={{ cursor: 'pointer' }}>
            Forgot Password?
          </StyledLink>
        </StyledAction>
      </Card>
    </Container>
  );
}
