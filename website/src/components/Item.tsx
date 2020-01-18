import React, { Props, PropsWithChildren } from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button } from 'baseui/button';
import EditInPlace from './EditInPlace';

import { ItemInterface } from '../context/types';
import { Block } from 'baseui/block';

export default function Item(props: PropsWithChildren<ItemInterface>) {
  const { title, body, id } = props;
  return (
    <Card
      // overrides={{ Root: { style: { width: '100%' } } }}
      title={title}
      headerImage={'https://source.unsplash.com/user/erondu/700x400'}
    >
      <StyledBody>
        <EditInPlace id={id} title={title} body={body} />
      </StyledBody>
      <StyledAction>
        <Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
          See
        </Button>
      </StyledAction>
    </Card>
  );
}
