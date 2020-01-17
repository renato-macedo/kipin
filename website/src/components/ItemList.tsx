import React, { useState, useEffect, useContext } from 'react';
import Item from './Item';

import { StyledLoadingSpinner } from 'baseui/button';
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
    <div>
      {items ? (
        items.map((item: { id: any; title: any; body: any }) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            body={item.body}
          />
        ))
      ) : (
        <p>Nenhum item</p>
      )}
    </div>
  );
}

export default ItemList;
