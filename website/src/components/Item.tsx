import React, { PropsWithChildren, Fragment, useContext } from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';

import { Button } from 'baseui/button';

import EditInPlace from './EditInPlace';

import { ItemInterface } from '../context/types';
import { useStyletron } from 'baseui';

import ItemsContext from '../context/items/ItemsContext';

// https://source.unsplash.com/user/erondu/300x300

export default function Item(props: PropsWithChildren<ItemInterface>) {
  const { title, body, id } = props;
  const [css] = useStyletron();
  const { deleteItem } = useContext(ItemsContext);
  return (
    <Fragment>
      <Card overrides={{ Root: { style: { width: '100%' } } }} title={title}>
        <StyledBody>
          <EditInPlace id={id} title={title} body={body} />
        </StyledBody>

        <StyledAction>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end'
            })}
          >
            <Button $as="a" href={body} size="compact" target="_blank">
              Visit
            </Button>
            <Button size="compact" kind="minimal">
              Delete
            </Button>
          </div>
        </StyledAction>
      </Card>
    </Fragment>
  );
}
