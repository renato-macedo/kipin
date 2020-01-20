import React, { useState, useEffect, useContext, Fragment } from 'react';
import Item from './Item';

import { StyledLoadingSpinner } from 'baseui/button';
import ItemsContext from '../context/items/ItemsContext';
import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { BlockProps } from 'baseui/block';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from 'baseui/list';
import { StatefulList } from 'baseui/dnd-list';
import { Button, KIND } from 'baseui/button';
import { Block } from 'baseui/block';

const items = [
  {
    id: 1,
    body: `http://docs.nestjs.com design system etc
    http://docs.nestjs.com design system etc
    http://docs.nestjs.com design system etc
    http://docs.nestjs.com design system etc
    http://docs.nestjs.com design system etc
    http://docs.nestjs.com design system etc`,
    title: 'NestJS Docs'
  },
  {
    id: 2,
    body: `saddkasjdkjsajkdja SAkdjsakjd kjaskdjksaj dksajkdujsakj dksajkodjsakldmsakojdskja kdj iasjdkjskajdkajdksjksajkdksajdksadasd
  asdsadajkshdjhsajdhsajhdjsha`,
    title: 'Base Web'
  },
  { id: 3, body: 'https://twitter.com/home', title: 'Twitter Feed' },
  { id: 4, body: 'http://docs.nestjs.com', title: 'NestJS Docs' },
  { id: 5, body: 'https://baseweb.design', title: 'Base Web' },
  { id: 6, body: 'https://twitter.com/home', title: 'Twitter Feed' }
];

function ItemList() {
  // const { items, getItems, loading } = useContext(ItemsContext);

  // useEffect(() => {
  //   getItems();
  // }, []);

  // if (loading) {
  //   return <p>Loading</p>;
  // }
  return (
    <Fragment>
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 5]}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
        justifyContent="center"
      >
        {items ? (
          items.map((item: any) => (
            <FlexGridItem key={item.id}>
              <Item id={item.id} title={item.title} body={item.body} />
            </FlexGridItem>
          ))
        ) : (
          <p>Nenhum item</p>
        )}
      </FlexGrid>
    </Fragment>
  );
}

const itemProps: BlockProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'scale1000'
};

export default ItemList;
