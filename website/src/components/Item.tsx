import React, { Props, PropsWithChildren } from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button } from 'baseui/button';

import { ItemInterface } from '../context/types';

export default function Item(props: PropsWithChildren<ItemInterface>) {
  const { title, body, id } = props;
  return (
    <Card overrides={{ Root: { style: { width: '328px' } } }} title={title}>
      <StyledThumbnail
        src={'https://source.unsplash.com/user/erondu/300x300'}
      />
      <StyledBody>{body}</StyledBody>
      <StyledAction>
        <Button overrides={{ BaseButton: { style: { width: '100%' } } }}>
          See
        </Button>
      </StyledAction>
    </Card>
  );
}
