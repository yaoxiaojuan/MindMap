const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    const status = xhr.status;
    console.log(xhr);
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
getJSON('src/json/basic.json', (err, data) => {
  if (err !== null) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(data);
  }
});
