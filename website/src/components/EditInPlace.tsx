import React, {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  useRef,
  Fragment,
  Ref
} from 'react';
import { ItemInterface } from '../context/types';
import ItemsContext from '../context/items/ItemsContext';
import { Textarea } from 'baseui/textarea';
import { Paragraph1 } from 'baseui/typography';
import { useStyletron } from 'baseui';
export default function EditInPlace(props: PropsWithChildren<ItemInterface>) {
  const { body, id, title } = props;
  const [css] = useStyletron();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(body);
  const { updateItem } = useContext(ItemsContext);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  function ChangeMode() {
    setEditing(true);
  }

  function finishEditing() {
    setEditing(false);
    if (body !== content) {
      updateItem({ id, body: content, title });
    }
  }
  // useEffect(() => {
  //   setContent(body);
  //   if (editing) {
  //     //inputRef.current.focus();
  //   }
  // }, [editing]);

  if (editing) {
    return (
      <Textarea
        size="large"
        overrides={{
          Input: {
            style: {
              height: '30vh',
              width: '100vw' // fill all available space up to parent max-width
            }
          },
          InputContainer: {
            style: {
              maxWidth: '100%',
              width: 'min-content'
            }
          }
        }}
        autoFocus={true}
        inputRef={inputRef}
        onBlur={finishEditing}
        onChange={e => setContent(e.currentTarget.value)}
        value={content}
      />
    );
  }

  return (
    <Fragment>
      {/* <StyledThumbnail src="https://source.unsplash.com/user/erondu/300x300" /> */}
      <div
        onClick={ChangeMode}
        className={css({
          padding: '0.1%',
          ':hover': {
            backgroundColor: '#E2E2E2'
          }
        })}
      >
        <Paragraph1>
          <span>{body}</span>
        </Paragraph1>
      </div>
    </Fragment>
  );
}
