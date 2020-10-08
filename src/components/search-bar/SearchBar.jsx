import React, { useState } from 'react';
import './SearchBar.css';

const data = [
  { id: "n1", name: "Jamiya Alvarez", title: "Chief Executive Officer", children: ["n2", "n3", "n9", "n10"]},
  { id: "n2", name: "Lewis Watts", title: "Chief Operations Officer" },
  { id: "n3", name: "Bridget Fyre", title: "Chief Technology Officer", children: ["n4", "n5", "n8"]},
  { id: "n4", name: "Tie Hua", title: "Senior Hardware Engineer" },
  { id: "n5", name: "Kaeden Cameron", title: "Senior Software Engineer", children: ["n6", "n7"]},
  { id: "n6", name: "Anabella Robbins", title: "Software Engineer I" },
  { id: "n7", name: "Xiang Xiang", title: "Software Engineer I" },
  { id: "n8", name: "Dereon Patel", title: "Software Engineer II" },
  { id: "n9", name: "Shirley Knight", title: "Head Council" },
  { id: "n10", name: "Carissa Rhodes", title: "Chief Marketing Officer", children: ["n11"]},
  { id: "n11", name: "Raiden Mueller", title: "Marketing Director" }
];

const filter_results = (input, data) => {
  let search_prefix = 'name';
  if (input.includes(':')) {
    search_prefix = input.split(':')[0];
  }
  let search_dict = data.reduce((map, obj) => (map[obj[search_prefix]] = obj, map), {});
  
  // console.log(search_prefix);
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
              setResults(filter_results(e.target.value, data));
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