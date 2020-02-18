import React, { useState, useContext, SyntheticEvent } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from 'baseui/modal';
import { FormControl } from 'baseui/form-control';
import { Textarea } from 'baseui/textarea';
import { Input } from 'baseui/input';
import AppContext from '../context/AppContext';

export default function AddItemForm(props: any) {
  const { isOpen, close } = props;
  //const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false);
  const { addItem } = useContext(AppContext);

  const [body, setBody] = useState('');
  const [error, setError] = useState(false);
  function clearStateAndClose() {
    close();
    setBody('');
  }

  function handleChange(ev: any) {
    if (event && event.currentTarget) {
      setError(false);
      setBody(ev.currentTarget.value);
    }
  }
  function submit() {
    setLoading(true);
    if (body) {
      addItem(body);
    } else {
      setError(true);
    }
    setLoading(false);
    clearStateAndClose();
  }

  return (
    <Modal onClose={clearStateAndClose} isOpen={isOpen}>
      <ModalHeader>New Item</ModalHeader>
      <ModalBody>
        {/* <FormControl label="Input label" caption="Input caption">
          <Input
            id="input-id"
            value={title}
            onChange={event => setTitle(event.currentTarget.value)}
          />
        </FormControl> */}
        <FormControl
          label="Add a note or URL"
          error={error ? 'This cannot be empty' : null}
        >
          <Textarea
            id="textarea-id"
            value={body}
            onChange={handleChange}
            error={error}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={clearStateAndClose}>Cancel</ModalButton>
        <ModalButton isLoading={loading} onClick={submit}>
          Okay
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
