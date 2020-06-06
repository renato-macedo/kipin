import React, {
  Fragment,
  useContext,
  useState
} from 'react';
import { Card, StyledBody, StyledAction, StyledThumbnail } from 'baseui/card';
import { StatefulMenu } from 'baseui/menu';

import { Button } from 'baseui/button';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';


import { useStyletron } from 'baseui';
import { Overflow } from 'baseui/icon';

import AppContext from '../context/AppContext';


// https://source.unsplash.com/user/erondu/300x300

export default function Item(props: any) {
  const {
    item: { title, body, id, image }
  } = props;
  const [open, setOpen] = useState(false);
  const { deleteItem } = useContext(AppContext);
  const [css] = useStyletron();
  function handleDelete(label: string) {
    if (label === 'Delete') {
      deleteItem(id);
    }
  }
  return (
    <Fragment>
      <Card overrides={{ Root: { style: { width: '100%' } } }} title={title}>
        <StyledThumbnail
          src={image ? image : 'http://localhost:3000/img/placeholder.png'}
        />
        {/* <StyledBody>
          <EditInPlace id={id} title={title} body={body} />
        </StyledBody> */}
        <StyledBody>
          <div
            className={css({
              wordBreak: 'break-word'
            })}
          >
            {body}
          </div>
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
