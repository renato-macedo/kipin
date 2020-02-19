import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Link } from 'react-router-dom';
import { useStyletron, styled } from 'baseui';
import AppContext from '../context/AppContext';
import { Block } from 'baseui/block';
import { Notification } from 'baseui/notification';
const FormContainer = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  margin: '5% auto'
});
import { string, object } from 'yup';

const schema = object({
  email: string()
    .email('Invalid email address')
    .required('Email is required'),
  password: string()
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required')
});

export default function Login(props: any) {
  const { login, isAuthenticated, error } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState<{
    path: string;
    errors: string[];
  } | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const credentials = { email, password };
    try {
      await schema.validate(credentials);
      login({ email, password });
    } catch (err) {
      setValidationError(err);
    }
    // // console.log(event, email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <div></div>
      <Block width={['100%', '100%', '60%', '30%']} margin="0 auto">
        {error && <Notification>{error}</Notification>}
        <FormContainer onSubmit={handleSubmit}>
          <Card
            title="Login"
            overrides={{
              Title: { style: { textAlign: 'center' } },
              Root: { style: { width: '100%' } }
            }}
          >
            <StyledBody>
              <FormControl
                label="Email"
                error={
                  validationError && validationError.path === 'email'
                    ? validationError.errors[0]
                    : null
                }
              >
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
              <FormControl
                label="Password"
                error={
                  validationError && validationError.path === 'password'
                    ? validationError.errors[0]
                    : null
                }
              >
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
                Log In
              </Button>
              <StyledLink style={{ cursor: 'pointer' }}>
                Forgot Password?
              </StyledLink>
              <Link to="/signup">Don't have a account? Sign Up Now</Link>
            </StyledAction>
          </Card>
        </FormContainer>
      </Block>
    </Fragment>
  );
}
