import React, { useEffect, useState, Fragment } from 'react';
import api from '../services/api';
import ItemList from '../components/ItemList';
import { Spinner } from 'baseui/spinner';
import { ItemInterface } from 'types';

export default function Home(): JSX.Element {
  const [items, setItems] = useState([
    { body: 'https://twitter.com/home', title: 'ok' },
    { body: 'https://twitter.com/home', title: 'ok' }
  ]);

  // useEffect(() => {
  //   getItems();
  // });
  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <Fragment>
      <h1>Home</h1>
      <ItemList />
    </Fragment>
  );
}
