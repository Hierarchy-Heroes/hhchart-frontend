import React, { useState } from 'react';
import './SearchBar.css';

const filter_results = (input, data) => {
  
}

const Result = (props) => {
  return (
    <div>
      <text>{props.name}</text>
      <text>{props.title}</text>
    </div>
  )
}

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);

  if (props.visible)
    return (
      <div className="backdrop" onClick={props.onClose}>
        <div className="bar-container">
          <input
            type='text'
            placeholder='Search Organization'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setResults(filter_results(e.target.value, props.data));
            }}
          />
          <i class="fas fa-search"></i>
        </div>
        <div className="results-container">
          {}
        </div>
      </div>
    );
  else {
    return null;
  }
}

export default SearchBar;