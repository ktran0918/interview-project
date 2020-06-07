async function main() {
  let cities = await getCities();
  let oregonCities = cities.filter(city => city.State == 'Oregon');
  let isReverseSort = false;

  renderCities(oregonCities);

  // Sort and re-render cities on click
  let cityHeader = document.getElementById('sort-cities');
  cityHeader.addEventListener('click', () => {
    sortCities(oregonCities, isReverseSort);
    renderCities(oregonCities);
    cityHeader.textContent = `City ${isReverseSort ? '↓' : '↑'}`;
    isReverseSort = !isReverseSort;
  });

}

// Fetch cities from '/cities' endpoint
async function getCities() {
  let data = await fetch('/cities');
  return data.json();
}

// Render cities in a table
function renderCities(cities) {
  let tableBody = document.getElementById('city-entries');
  // Clear existing entries
  let entry;
  while (entry = tableBody.firstChild) {
    tableBody.removeChild(entry);
  }

  // Append new entries
  for (let city of cities) {
    let row = document.createElement('tr');
    let stateEntry = document.createElement('td');
    let cityEntry = document.createElement('td');

    stateEntry.textContent = city.State;
    cityEntry.textContent = city.city;

    row.appendChild(stateEntry);
    row.appendChild(cityEntry);

    tableBody.appendChild(row);
  }
}

// Sort cities in alphabetical in forward or reverse order
function sortCities(tableRows, isReverse) {
  tableRows.sort((a, b) => {
    let cityA = a.city;
    let cityB = b.city;

    if (cityA < cityB) {
      return isReverse ? 1 : -1;
    } else if (cityA > cityB) {
      return isReverse ? -1 : 1;
    }

    return 0;
  });
}


main();
