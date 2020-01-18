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
export default function EditInPlace(props: PropsWithChildren<ItemInterface>) {
  const { body, id, title } = props;
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState('');
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
  useEffect(() => {
    setContent(body);
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  if (editing) {
    return (
      <Textarea
        inputRef={inputRef}
        onBlur={finishEditing}
        onChange={e => setContent(e.currentTarget.value)}
        value={content}
      />
    );
  }

  return (
    <Paragraph1>
      <span onClick={ChangeMode}>{body}</span>
    </Paragraph1>
  );
}
