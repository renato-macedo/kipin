import React, { useState, useEffect, useContext } from 'react';
import Item from './Item';

import { StyledLoadingSpinner } from 'baseui/button';
import ItemsContext from '../context/items/ItemsContext';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { BlockProps } from 'baseui/block';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from 'baseui/list';
import { Block } from 'baseui/block';

const items = [
  { id: 1, body: 'http://docs.nestjs.com', title: 'NestJS Docs' },
  { id: 2, body: 'https://baseweb.design', title: 'Base Web' },
  { id: 3, body: 'https://twitter.com/home', title: 'Twitter Feed' },
  { id: 4, body: 'http://docs.nestjs.com', title: 'NestJS Docs' },
  { id: 5, body: 'https://baseweb.design', title: 'Base Web' },
  { id: 6, body: 'https://twitter.com/home', title: 'Twitter Feed' }
];

function ItemList() {
  const [css, theme] = useStyletron();

  // const { items, getItems, loading } = useContext(ItemsContext);

  // useEffect(() => {
  //   getItems();
  // }, []);

  // if (loading) {
  //   return <p>Loading</p>;
  // }
  return (
    <FlexGrid
      flexGridColumnCount={[1, 1, 2, 5]}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
      justifyContent="center"
    >
      {items ? (
        items.map((item: any) => (
          <FlexGridItem>
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
            />
          </FlexGridItem>
        ))
      ) : (
        <p>Nenhum item</p>
      )}
    </FlexGrid>
  );
}

const itemProps: BlockProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'scale1000'
};

export default ItemList;
