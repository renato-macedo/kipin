import React, { useState, useEffect } from 'react';
import Item from './Item';
import { ItemListProps, ItemInterface } from 'types/Item';
import api from '../services/api';
import { StyledLoadingSpinner } from 'baseui/button';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlbmF0b21hY2VuZXRvQGdtYWlsLmNvbSIsInN1YiI6IjVkZTMzMzJkZTA3ZGU3NDY2NDg2NTVkMCIsImlhdCI6MTU3ODIxNjA2OSwiZXhwIjoxNTc4MjE5NjY5fQ.W4ezjsppDfLEmZydSDq8SAM6L50SDRa0bezMCxfLwpw';

function ItemList() {
  const defaultItems: ItemInterface[] = [];
  const [items, setItems] = useState(defaultItems);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await api.ItemsService(token).get('');
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getItems();
  }, []);
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
