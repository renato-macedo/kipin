import React, {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  Fragment
} from 'react';
import { ItemInterface } from '../context/types';
import ItemsContext from '../context/items/ItemsContext';

export default function EditInPlace(props: PropsWithChildren<ItemInterface>) {
  const { body, id, title } = props;
  const [mode, setMode] = useState('read');
  const [content, setContent] = useState('');
  const { updateItem } = useContext(ItemsContext);

  function ChangeMode() {
    setMode('update');
  }

  function finishEditing() {
    setMode('read');
    updateItem({ id, body: content, title });
  }

  function changeContent(e: any) {
    setContent(e.target.value);
  }

  useEffect(() => {
    setContent(body);
  }, [mode]);

  if (mode === 'update') {
    return (
      <input
        type="text"
        onBlur={finishEditing}
        onChange={changeContent}
        value={content}
      />
    );
  }

  return <p onDoubleClick={ChangeMode}>{body}</p>;
}
