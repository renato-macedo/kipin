import React, { useState, useEffect, useContext, Fragment } from 'react';
import Item from './Item';

import { StyledLoadingSpinner } from 'baseui/button';

import { FlexGrid } from 'baseui/flex-grid';
import ItemsContext from '../context/items/ItemsContext';

function ItemList() {
  const { items, getItems, loading } = useContext(ItemsContext);

  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
    return <p>Loading</p>;
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
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
            />
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
