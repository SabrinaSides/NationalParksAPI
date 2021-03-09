'use strict';

// put your own value below!
const apiKey = 'ZrLDFqf6q4neOh80ManaG2KezOheUuBeSeMb4BOI'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  let queryJoined = queryItems.join('&');
  return queryJoined;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
      $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <img src='${responseJson.data[i].images[0].url}' alt='Picture of national park' width='100%'>
      <p>${responseJson.data[i].description}</p>
      <p>Park Address:<br> ${responseJson.data[i].addresses[0].line1}<br>
      ${responseJson.data[i].addresses[0].line2}<br>
      ${responseJson.data[i].addresses[0].city},
      ${responseJson.data[i].addresses[0].stateCode}<br>
      ${responseJson.data[i].addresses[0].postalCode}<br>
      (Mailing address may vary. See nps.gov for more info)<p>
      <a href="${responseJson.data[i].url}">Park Webpage</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNationalParks(query, maxResults) {
  const params = {
    api_key: apiKey,
    q: query,
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
      throw new Error('Something went wrong. Please make sure to enter a valid user handle.');
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Please make sure to enter a valid state.'));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);