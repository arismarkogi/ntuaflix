/*import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:9876/name/nameID');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
*/

function getTitleDetails() {
  const titleID = $('#titleID').val();

  $.ajax({
      type: 'GET',
      url: `https://localhost:9876/ntuaflix_api/title/${titleID}`,
      success: function (data) {
          console.log('Title Details:', data);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}

function searchByTitle() {
  const titlePart = $('#titlePart').val();

  $.ajax({
      type: 'GET',
      url: 'https://localhost:9876/ntuaflix_api/searchtitle',
      data: { titlePart: titlePart },
      success: function (data) {
          console.log('Search Results:', data);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}

function searchByGenre() {
  const qgenre = $('#genre').val();
  const minRating = $('#minRating').val();
  const yrFrom = $('#startYear').val();
  const yrTo = $('#endYear').val();

  $.ajax({
      type: 'GET',
      url: 'https://localhost:9876/ntuaflix_api/bygenre',
      data: { qgenre: qgenre, minrating: minRating, yrFrom: yrFrom, yrTo: yrTo },
      success: function (data) {
          console.log('Search Results by Genre:', data);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}

function getNameDetails() {
  const nameID = $('#nameID').val();

  $.ajax({
      type: 'GET',
      url: `https://localhost:9876/ntuaflix_api/name/${nameID}`,
      success: function (data) {
          console.log('Name Details:', data);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}
