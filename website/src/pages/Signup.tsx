import React, { useState } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { useStyletron, styled } from 'baseui';

const Container = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  margin: '5% auto'
});

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(event, email, password);
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Card
        title="Sign Up"
        overrides={{
          Title: { style: { textAlign: 'center' } },
          Root: { style: { width: '30%' } }
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
          <FormControl label="Confirm Password">
            <Input
              type="password"
              value={password2}
              placeholder="Password"
              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                setPassword2(event.currentTarget.value)
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
