import React, { useState, useEffect, useContext, Fragment } from 'react';
import Item from './Item';

import { StyledLoadingSpinner } from 'baseui/button';

import { FlexGrid } from 'baseui/flex-grid';
import AppContext from '../context/AppContext';

function ItemList() {
  const { items, getItems, item_loading } = useContext(AppContext);

  useEffect(() => {
    getItems();
  }, []);

  if (item_loading) {
    //return <p>Loading</p>;
    return <StyledLoadingSpinner />;
  }

  return (
    <Fragment>
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 5]}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
        justifyContent="center"
      >
        {items ? (
          items.map(item => (
            // <FlexGridItem key={item.id}>
            <Item key={item.id} item={item} />
            // </FlexGridItem>
          ))
        ) : (
          <li>Nenhum item</li>
        )}
      </FlexGrid>
    </Fragment>
  );
}

export default ItemList;
