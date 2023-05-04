import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SearchBar.css';

export default function SearchBar({onSearch, onReset, placeholder}) {  
  return (
    <>
      <Form.Control id="searchBar" type="text" placeholder={placeholder} />
      <Button
        variant="success"
        onClick={(e) => onSearch(e, searchBar.value)}
        size= "sm"
      >
        Search
      </Button>
      <Button
        variant="disabled"
        onClick={(e) => onReset(e, searchBar.value)}
        type="reset"
        className="ms-1"
        size= "sm"
      >
        Reset
      </Button>
    </>
  );
}