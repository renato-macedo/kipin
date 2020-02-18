/* eslint-disable no-unused-vars */
import React, { Fragment, useContext } from 'react';
//import api from '../services/api';
import ItemList from '../components/ItemList';
import AppContext from '../context/AppContext';
import { useStyletron } from 'styletron-react';
import { Block } from 'baseui/block';
import { Nav } from '../components';

//import { Spinner } from 'baseui/spinner';
//import { ItemInterface } from 'types';

export default function Home(): JSX.Element {
  // if (isLoading) {
  //   return <Spinner />;
  // }
  const { isAuthenticated } = useContext(AppContext);

  // useEffect(() => {
  //   loadUser();
  // }, [isAuthenticated, user]);
  return (
    <Fragment>
      <Nav />
      <Block
        width={['100%', '100%', '50%']}
        margin="0 auto"
        // className={css({
        //   display: 'flex',
        //   width: '100%',
        //   margin: '0 auto'
        // })}
      >
        <h1>My List</h1>
        {/* <ItemList /> */}
        {isAuthenticated ? <ItemList /> : <h1>Usuário não autenticado</h1>}
      </Block>
    </Fragment>
  );
}
