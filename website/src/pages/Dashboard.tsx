/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment, useContext } from 'react';
//import api from '../services/api';
import ItemList from '../components/ItemList';
import AuthContext from '../context/auth/AuthContext';
//import { Spinner } from 'baseui/spinner';
//import { ItemInterface } from 'types';

export default function Home(): JSX.Element {
  // if (isLoading) {
  //   return <Spinner />;
  // }
  const { loadUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    //getItems();
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated]);
  return (
    <Fragment>
      <h1>Home</h1>
      <ItemList />
      {/* {isAuthenticated ? <ItemList /> : <h1>Usuário não autenticado</h1>} */}
    </Fragment>
  );
}
