import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron, styled } from 'baseui';
import { Block } from 'baseui/block';
import AuthContext from '../context/auth/AuthContext';
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

export default function Signup(props: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, error, isAuthenticated, loading, setLoading } = useContext(
    AuthContext
  );
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    register({ name, email, password });
    // console.log(event, email, password);
    setIsLoading(false);
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
              <FormControl label="Name">
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
                isLoading={loading}
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
