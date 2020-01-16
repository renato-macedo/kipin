/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment, useContext } from 'react';
//import api from '../services/api';
import ItemList from '../components/ItemList';
import AuthContext from '../context/auth/AuthContext';
//import { Spinner } from 'baseui/spinner';
//import { ItemInterface } from 'types';

export default function Home(): JSX.Element {
  // const [items, setItems] = useState([
  //   { body: 'https://twitter.com/home', title: 'ok' },
  //   { body: 'https://twitter.com/home', title: 'ok' }
  // ]);

  useEffect(() => {
    //getItems();
    loadUser()
  }, []);
  // if (isLoading) {
  //   return <Spinner />;
  // }
  const { loadUser } = useContext(AuthContext)
  function handleClick() {
    loadUser()
  }
  return (
    <Fragment>
      <h1>Home</h1>
      {/* <button onClick={handleClick}>Verificar se esta autenticado</button> */}
      <ItemList />
    </Fragment>
  );
}
