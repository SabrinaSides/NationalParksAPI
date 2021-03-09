'use strict';

// put your own value below!
const apiKey = 'ZrLDFqf6q4neOh80ManaG2KezOheUuBeSeMb4BOI'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURI(params[key])}`)
  let queryJoined = queryItems.join('&');
  console.log('This is the gueryJoined ' + queryJoined)
  return queryJoined;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  $('#search-results').empty();
  const stateCode = $('#js-state-code').val();
  $('#search-results').append('Search Results for ' + stateCode)
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
      $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">Park Webpage</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert(error));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-state-code').val();
    console.log('this is the state code ' + stateCode
    );
    const maxResults = $('#js-max-results').val();
    getNationalParks(stateCode, maxResults);
  });
}

$(watchForm);
