/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment, useContext } from 'react';
//import api from '../services/api';
import ItemList from '../components/ItemList';
import AuthContext from '../context/auth/AuthContext';
import { useStyletron } from 'styletron-react';
//import { Spinner } from 'baseui/spinner';
//import { ItemInterface } from 'types';

export default function Home(): JSX.Element {
  // if (isLoading) {
  //   return <Spinner />;
  // }
  const { loadUser, isAuthenticated } = useContext(AuthContext);
  const [css] = useStyletron();

  useEffect(() => {
    //getItems();
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated]);
  return (
    <div
    // className={css({
    //   display: 'flex',
    //   width: '100%',
    //   margin: '0 auto'
    // })}
    >
      <h1>My List</h1>

      {isAuthenticated ? <ItemList /> : <h1>Usuário não autenticado</h1>}
    </div>
  );
}
