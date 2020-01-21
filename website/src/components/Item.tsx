import React, {
  PropsWithChildren,
  Fragment,
  useContext,
  useState
} from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { StatefulMenu } from 'baseui/menu';

import { Button } from 'baseui/button';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import EditInPlace from './EditInPlace';

import { ItemInterface } from '../context/types';
import { useStyletron } from 'baseui';
import { Overflow } from 'baseui/icon';

import ItemsContext from '../context/items/ItemsContext';
import { Block } from 'baseui/block';

// https://source.unsplash.com/user/erondu/300x300

export default function Item(props: any) {
  const { title, body, id, openMenu } = props;
  const [open, setOpen] = useState(false);
  const { deleteItem } = useContext(ItemsContext);
  const [css] = useStyletron();
  function handleDelete(label: string) {
    if (label === 'Delete') {
      deleteItem(id);
    }
  }
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
            <Button
              $as="a"
              href={body}
              kind="primary"
              size="compact"
              target="_blank"
            >
              Visit
            </Button>
            <StatefulPopover
              placement={PLACEMENT.bottomLeft}
              content={({ close }) => (
                <StatefulMenu
                  items={[
                    { label: 'Share' },
                    { label: 'Favorite' },
                    { label: 'Delete' }
                  ]}
                  onItemSelect={({ item: { label } }) => {
                    close();
                    handleDelete(label);
                  }}
                  // overrides={{
                  //   List: { style: { height: '150px', width: '138px' } }
                  // }}
                />
              )}
            >
              <Button kind="tertiary" size="compact">
                <Overflow />
              </Button>
            </StatefulPopover>
          </div>
        </StyledAction>
      </Card>
    </Fragment>
  );
}
