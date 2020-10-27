import React, { useState } from 'react';

/**
 * This function renders a component after an API request has completed
 * 
 * @param {*} ComponentToBind The component to render after the API request is complete
 * @param {*} dataToProps A function that transforms the data from the API request into the props of ComponentToBind
 * @param {*} url The URL of the API endpoint
 * @param {*} params The params for the ES6 fetch call
 */
const apiBind = (ComponentToBind, dataToProps, url, params) => {
  return (props) => {
    const [data, setData] = useState({});
    const [requestComplete, setRequestComplete] = useState(false);
    if (!requestComplete) {
      console.log(`API bound component requesting ${url}`);
      
      fetch(url, params)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setRequestComplete(true);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    return <ComponentToBind {...props} {...dataToProps(data)} />
  }
};

export default apiBind;
