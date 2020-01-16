import React, { useState, useEffect } from 'react';
import Item from './Item';
import { ItemListProps, ItemInterface } from 'types/Item';
import { StyledLoadingSpinner } from 'baseui/button';

function ItemList() {
  const defaultItems: ItemInterface[] = [];
  const [items, setItems] = useState(defaultItems);
  const [isLoading, setLoading] = useState(false);
  if (isLoading) {
    return <StyledLoadingSpinner />;
  }

  return (
    <div>
      {items.map(item => (
        <Item key={item.Id} title={item.title} body={item.body} />
      ))}
    </div>
  );
}

export default ItemList;
