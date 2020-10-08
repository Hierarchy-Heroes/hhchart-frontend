import React, { useState } from 'react';
import './SearchBar.css';
import Fuse from 'fuse.js';

const filter_results = (input, data) => {
  let search_prefix = 'name';
  if (input.includes(':')) {
    search_prefix = input.split(':')[0];
    input = input.split(':')[1];
  }
  const fuse = new Fuse(data, { keys: [search_prefix] });
  // let search_dict = data.reduce((map, obj) => (map[obj[search_prefix]] = obj, map), {});
  // console.log(fuse.search(input));
  return fuse.search(input);
}

const Result = (props) => {
  return (
    <li>
      <a className="result" href="#">
        <i class="fas fa-user-circle"></i>
        <ul>
          <li>{props.name}</li>
          <li>{props.title}</li>
        </ul>
      </a>
    </li>
  )
}

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  if (props.visible)
    return (
      <div className="modal-container">
        <div className="backdrop" onClick={props.handleClickOut} />
        <div className="bar-container">
          <input
            id='search'
            type='text'
            placeholder='Search Organization'
            autoFocus
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setResults(filter_results(e.target.value, props.data));
            }}
          />
          <label for='search'><i class="fas fa-search"></i></label>
        </div>
        <div className="results-container">
          <ul>
            {results.map(({ item }) => <Result name={item.name} title={item.title} />)}
          </ul>
        </div>
      </div>
    );
  else {
    return null;
  }
}

export { SearchBar };