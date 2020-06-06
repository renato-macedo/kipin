import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'baseui/button';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { StyledLink } from 'baseui/link';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { styled } from 'baseui';
import { Block } from 'baseui/block';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import Axios from 'axios';
const FormContainer = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  margin: '5% auto'
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Login(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passsword2, setPassword2] = useState('');
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [updated, SetUpdated] = useState(false);
  let query = useQuery();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await Axios.post('http://localhost:3000/auth/reset', {
      email,
      password,
      confirm_password: passsword2
    });
    if (response.data.success) {
      SetUpdated(true);
    }
    // // console.log(event, email, password);
  }
  async function validateToken() {
    const token = query.get('token');
    if (!token) {
      setLoading(false);
    } else {
      try {
        const response = await Axios.post('http://localhost:3000/auth/token', {
          token
        });
        setEmail(response.data.email);
        setValidToken(true);
      } catch (error) {
        console.log(error.response.data);
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    validateToken();
  }, []);
  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (updated) {
    return <h3>Password Updated</h3>;
  }
  return (
    <Block width={['100%', '100%', '60%', '30%']} margin="0 auto">
      {validToken ? (
        <FormContainer onSubmit={handleSubmit}>
          <Card
            title="Reset Password"
            overrides={{
              Title: { style: { textAlign: 'center' } },
              Root: { style: { width: '100%' } }
            }}
          >
            <StyledBody>
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
                  value={passsword2}
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
                Reset
              </Button>
              <StyledLink style={{ cursor: 'pointer' }}>
                Forgot Password?
              </StyledLink>
            </StyledAction>
          </Card>
        </FormContainer>
      ) : (
        <h3>Link expired</h3>
      )}
    </Block>
  );
}
