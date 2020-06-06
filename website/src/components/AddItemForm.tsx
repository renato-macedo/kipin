import React, { useState, useContext, SyntheticEvent } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { string } from 'yup';
import AppContext from '../context/AppContext';

const schema = string().url('This must be a valid URL').required();

export default function AddItemForm(props: any) {
  const { isOpen, close } = props;
  const [loading, setLoading] = useState(false);
  const { addItem } = useContext(AppContext);

  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  function clearStateAndClose() {
    close();
    setBody('');
  }

  function handleChange(ev: any) {
    if (event && event.currentTarget) {
      setError('');
      setBody(ev.currentTarget.value);
    }
  }
  async function submit() {
    setLoading(true);

    try {
      await schema.validate(body);
      addItem(body);
      clearStateAndClose();
    } catch (error) {
      setError(error.errors[0]);
    }
    setLoading(false);
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
        <FormControl label="Add a URL" error={error ? error : null}>
          {/* <Textarea
            id="textarea-id"
            value={body}
            onChange={handleChange}
            error={!!error}
          /> */}
          <Input value={body} onChange={handleChange} error={!!error} />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={clearStateAndClose}>Cancel</ModalButton>
        <ModalButton isLoading={loading} onClick={submit}>
          Ok
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
