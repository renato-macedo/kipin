import React, { Props, PropsWithChildren } from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { Button, KIND } from 'baseui/button';
import { Block } from 'baseui/block';
import EditInPlace from './EditInPlace';
import { Delete, DeleteAlt } from 'baseui/icon';

import { ItemInterface } from '../context/types';

export default function Item(props: PropsWithChildren<ItemInterface>) {
  const { title, body, id } = props;
  return (
    <Block>{body}</Block>
    // <Card
    //   // overrides={{ Root: { style: { width: '100%' } } }}
    //   title={title}
    //   headerImage={'https://source.unsplash.com/user/erondu/700x400'}
    // >
    //   <StyledBody>
    //     <EditInPlace id={id} title={title} body={body} />
    //   </StyledBody>
    //   <StyledAction>
    //     <Button
    //       $as="a"
    //       href={body}
    //       target="_blank"
    //       overrides={{ BaseButton: { style: { width: '80%' } } }}
    //     >
    //       See
    //     </Button>
    //     <Button onClick={() => alert('click')} kind={KIND.minimal}>
    //       <DeleteAlt />
    //     </Button>
    //   </StyledAction>
    // </Card>
  );
}
