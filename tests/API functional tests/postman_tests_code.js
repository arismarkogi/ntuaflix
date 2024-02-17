
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains expected fields", function () {
    pm.expect(pm.response.json()).to.have.property('titleID');
    pm.expect(pm.response.json()).to.have.property('type');
    pm.expect(pm.response.json()).to.have.property('originalTitle');
    pm.expect(pm.response.json()).to.have.property('titlePoster');
    pm.expect(pm.response.json()).to.have.property('startYear');
    pm.expect(pm.response.json()).to.have.property('endYear');
    pm.expect(pm.response.json()).to.have.property('genres');
    pm.expect(pm.response.json()).to.have.property('titleAkas');
    pm.expect(pm.response.json()).to.have.property('principals');
    pm.expect(pm.response.json()).to.have.property('rating');
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});


//-----------------------------------------------------------------------------------

// 

pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});


//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type is text/csv", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

pm.test("Response contains expected CSV headers", function () {
    // Assuming the response body is a CSV file
    const csvHeaders = pm.response.text().split('\n')[0].split(',');

    // Define the expected CSV headers
    const expectedHeaders = [
        'titleID',
        'type',
        'originalTitle',
        'titlePoster',
        'startYear',
        'endYear',
        'genres',
        'titleAkas',
        'principals',
        'rating.avRating',
        'rating.nVotes'
    ];

    // Check if all expected headers are present in the response
    pm.expect(expectedHeaders.every(header => csvHeaders.includes(header))).to.be.true;
});

//-----------------------------------------------------------------------------------



pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});


//-----------------------------------------------------------------------------------


pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});


//-----------------------------------------------------------------------------------


pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type is text/csv", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

pm.test("Response contains expected CSV headers", function () {
    // Assuming the response body is a CSV file
    const csvHeaders = pm.response.text().split('\n')[0].split(',');

    // Define the expected CSV headers
    const expectedHeaders = [
        'titleID',
        'type',
        'originalTitle',
        'titlePoster',
        'startYear',
        'endYear',
        'genres',
        'titleAkas',
        'principals',
        'rating.avRating',
        'rating.nVotes'
    ];

    // Check if all expected headers are present in the response
    pm.expect(expectedHeaders.every(header => csvHeaders.includes(header))).to.be.true;
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is a list of objects with expected fields", function () {
    // Ensure the response is an array
    pm.expect(pm.response.json()).to.be.an('array');

    // Iterate over each item in the array
    pm.response.json().forEach(function (item) {
        // Ensure each item is an object
        pm.expect(item).to.be.an('object');

        // Check if the object has the expected fields
        pm.expect(item).to.have.property('titleID');
        pm.expect(item).to.have.property('type');
        pm.expect(item).to.have.property('originalTitle');
        pm.expect(item).to.have.property('titlePoster');
        pm.expect(item).to.have.property('startYear');
        pm.expect(item).to.have.property('endYear');
        pm.expect(item).to.have.property('genres');
        pm.expect(item).to.have.property('titleAkas');
        pm.expect(item).to.have.property('principals');
        pm.expect(item).to.have.property('rating');
    });
});


pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});
 

//-----------------------------------------------------------------------------------


pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Content-Type is text/csv", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('text/csv');
});

pm.test("Response contains expected CSV headers", function () {
    // Assuming the response body is a CSV file
    const csvHeaders = pm.response.text().split('\n')[0].split(',');

    // Define the expected CSV headers
    const expectedHeaders = [
        'nameID',
        'name',
        'namePoster',
        'birthYr',
        'deathYr',
        'profession',
        'nameTitles'
    ];

    // Check if all expected headers are present in the response
    pm.expect(expectedHeaders.every(header => csvHeaders.includes(header))).to.be.true;
}); 

//-----------------------------------------------------------------------------------


pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

 
//-----------------------------------------------------------------------------------

pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
}); 

//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is a list of objects with expected fields", function () {
    // Ensure the response is an array
    pm.expect(pm.response.json()).to.be.an('array');

    // Iterate over each item in the array
    pm.response.json().forEach(function (item) {
        // Ensure each item is an object
        pm.expect(item).to.be.an('object');

        // Check if the object has the expected fields
        pm.expect(item).to.have.property('nameID');
        pm.expect(item).to.have.property('name');
        pm.expect(item).to.have.property('namePoster');
        pm.expect(item).to.have.property('birthYr');
        pm.expect(item).to.have.property('deathYr');
        pm.expect(item).to.have.property('profession');
        pm.expect(item).to.have.property('nameTitles');
    });
});


pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});

//-----------------------------------------------------------------------------------


pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');
});


//-----------------------------------------------------------------------------------


pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
}); 

//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});

//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});


//-----------------------------------------------------------------------------------


pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});


//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});
//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});
//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});
//-----------------------------------------------------------------------------------

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body is valid JSON", function () {
    pm.response.to.be.json;
});

pm.test("Response body contains 'status' key", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('status');
});

pm.test("Response 'status' is 'OK'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.equal('OK');
});





