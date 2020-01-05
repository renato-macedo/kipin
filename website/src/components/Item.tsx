import * as React from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button } from 'baseui/button';
import { ItemProps } from 'types/Item';

export default function Item(props: ItemProps) {
  const { title, body } = props;
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
