import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import React from 'react';

export default function Loader() {
  return (
    <div className="loader">
      <TailSpin height="100" width="100" color="grey" ariaLabel="loading" />;
    </div>
  );
}
