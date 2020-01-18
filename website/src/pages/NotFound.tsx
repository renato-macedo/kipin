import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Fragment>
      <h3>Not Found</h3>
      <Link to="/">Back to Home</Link>
    </Fragment>
  );
}
