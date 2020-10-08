import React, { useState } from 'react';
import './SearchBar.css';
import Fuse from 'fuse.js';

const data = [
  { id: "n1", name: "Jamiya Alvarez", title: "Chief Executive Officer", children: ["n2", "n3", "n9", "n10"] },
  { id: "n2", name: "Lewis Watts", title: "Chief Operations Officer" },
  { id: "n3", name: "Bridget Fyre", title: "Chief Technology Officer", children: ["n4", "n5", "n8"] },
  { id: "n4", name: "Tie Hua", title: "Senior Hardware Engineer" },
  { id: "n5", name: "Kaeden Cameron", title: "Senior Software Engineer", children: ["n6", "n7"] },
  { id: "n6", name: "Anabella Robbins", title: "Software Engineer I" },
  { id: "n7", name: "Xiang Xiang", title: "Software Engineer I" },
  { id: "n8", name: "Dereon Patel", title: "Software Engineer II" },
  { id: "n9", name: "Shirley Knight", title: "Head Council" },
  { id: "n10", name: "Carissa Rhodes", title: "Chief Marketing Officer", children: ["n11"] },
  { id: "n11", name: "Raiden Mueller", title: "Marketing Director" }
];

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
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setResults(filter_results(e.target.value, data));
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