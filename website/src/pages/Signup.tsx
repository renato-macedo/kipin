import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron, styled } from 'baseui';
import { Block } from 'baseui/block';
import AppContext from '../context/AppContext';
// import { Toast, KIND, ToasterContainer, PLACEMENT } from 'baseui/toast';
import { Notification, KIND } from 'baseui/notification';
import { DeleteAlt } from 'baseui/icon';
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
  name: string()
    .max(50, 'Password must be 50 characters or less')
    .required('Name is required'),
  email: string()
    .email('Invalid email address')
    .required('Email is required'),
  password: string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must be 20 characters or less')
    .required('Password is required')
});

export default function Signup(props: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationError, setValidationError] = useState<{
    path: string;
    errors: string[];
  } | null>(null);

  const { register, error, isAuthenticated, loading } = useContext(AppContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const credentials = { name, email, password };
    try {
      await schema.validate(credentials);
      register(credentials);
    } catch (err) {
      setValidationError(err);
    }
    // console.log(event, email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  });

  // if (loading) {
  //   return <h3>Loading...</h3>;
  // }

  return (
    <Fragment>
      {error && (
        <Notification
          kind={KIND.negative}
          overrides={{
            Body: {
              style: ({ $theme }) => ({
                ...$theme.borders.border600,
                margin: '0 auto'
              })
            },
            CloseIcon: {
              component: DeleteAlt as React.FC<any>,
              style: { float: 'right', cursor: 'pointer' }
            }
          }}
          closeable
        >
          {error}
        </Notification>
      )}
      <Block
        width={['100%', '100%', '60%', '30%']}
        margin="0 auto"
        backgroundColor="red"
      >
        <FormContainer onSubmit={handleSubmit}>
          <Card
            title="Sign Up"
            overrides={{
              Title: { style: { textAlign: 'center' } },
              Root: { style: { width: '100%' } }
            }}
          >
            <StyledBody>
              <FormControl
                label="Name"
                error={
                  validationError && validationError.path === 'name'
                    ? validationError.errors[0]
                    : null
                }
              >
                <Input
                  value={name}
                  type="text"
                  placeholder="Name"
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    setName(event.currentTarget.value)
                  }
                  clearable
                />
              </FormControl>
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
                Sign Up
              </Button>
            </StyledAction>
          </Card>
        </FormContainer>
      </Block>
    </Fragment>
  );
}
