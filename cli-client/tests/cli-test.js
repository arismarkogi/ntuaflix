const { execSync } = require('child_process');
const assert = require('assert');

describe('CLI Tests', () => {

  it('should handle title command with JSON format', () => {
    const output = execSync('se2343 title --titleID tt0000929 --format json').toString();
    const parsedOutput = JSON.parse(output);
    const expectedFields =  [
      'titleID',
      'type',
      'originalTitle',
      'titlePoster',
      'startYear',
      'endYear',
      'genres',
      'titleAkas',
      'principals',
      'rating'
    ];
    expectedFields.forEach(field => {
      assert.ok(parsedOutput.hasOwnProperty(field), `Expected field "${field}" missing in JSON response`);
    });

    assert.strictEqual(parsedOutput.titleID, 'tt0000929');
  });

  it('should handle searchtitle command with CSV format', () => {
    const output = execSync('se2343 searchtitle --titlepart ab --format csv').toString();
  
    // Split the CSV lines into an array
    const lines = output.trim().split('\n');
  
    // Check if there is at least one line (header or data)
    assert.ok(lines.length > 0, 'CSV should have at least one line');
  
    const expectedFields = [
      'titleID',
      'type',
      'originalTitle',
      'titlePoster',
      'startYear',
      'endYear',
      'genres',
      'titleAkas',
      'principals',
      'rating.nVotes',
      'rating.avRating'
    ];
    
    const header = lines[0].split(',');

    // Check if the header contains the expected field names
    expectedFields.forEach((field) => {
      assert.ok(header.includes(field), `Expected field "${field}" missing in CSV header`);
    });
  
    // Find the index of the 'originalTitle' field
    const originalTitleIndex = header.indexOf('originalTitle');
    
    // If there is data, you can check its format
    if (lines.length > 1) {
      const data = lines.slice(1).map((line) => line.split(','));
      // Check if the 'originalTitle' field contains "ab" in each row
      const originalTitleValues = data.map((row) => row[originalTitleIndex].toLowerCase());
      assert.ok(originalTitleValues.every((value) => value.includes('ab')), 'Value "ab" not found in originalTitle');
    }
  });

  it('should handle bygenre command with 2 parameters ', () => {
    const output = execSync('se2343 bygenre --genre Drama --min 7.5').toString();
    const parsedOutput = JSON.parse(output);
    for(i = 0; i < parsedOutput.length; i++){
      // Iterate over each item in the array
      const expectedFields =  [
        'titleID',
        'type',
        'originalTitle',
        'titlePoster',
        'startYear',
        'endYear',
        'genres',
        'titleAkas',
        'principals',
        'rating'
      ];
      expectedFields.forEach(field => {
        assert.ok(parsedOutput[i].hasOwnProperty(field), `Expected field "${field}" missing in JSON response`);
      });
    }
  });

  it('should handle bygenre command with CSV format and 4 parameters', () => {
    const output = execSync('se2343 bygenre --genre Comedy --min 6 --from 1940 --to 2000 --format csv').toString();
  
    // Split the CSV lines into an array
    const lines = output.trim().split('\n');
  
    // Check if there is at least one line (header or data)
    assert.ok(lines.length > 0, 'CSV should have at least one line');
  
    const expectedFields = [
      'titleID',
      'type',
      'originalTitle',
      'titlePoster',
      'startYear',
      'endYear',
      'genres',
      'titleAkas',
      'principals',
      'rating.nVotes',
      'rating.avRating'
    ];
    
    const header = lines[0].split(',');

    // Check if the header contains the expected field names
    expectedFields.forEach((field) => {
      assert.ok(header.includes(field), `Expected field "${field}" missing in CSV header`);
    });

  });

  it('should handle name command with JSON format', () => {
    const output = execSync('se2343 name --nameid nm0000019 --format json').toString();
    const parsedOutput = JSON.parse(output);
    const expectedFields = [
      'nameID',
      'name',
      'namePoster',
      'birthYr',
      'deathYr',
      'profession',
      'nameTitles'
    ];
    expectedFields.forEach(field => {
      assert.ok(parsedOutput.hasOwnProperty(field), `Expected field "${field}" missing in JSON response`);
    });

    assert.strictEqual(parsedOutput.nameID, 'nm0000019');
  });

  it('should handle searchname command with CSV format', () => {
    const output = execSync('se2343 searchname --name George --format csv').toString();
  
    // Split the CSV lines into an array
    const lines = output.trim().split('\n');
  
    // Check if there is at least one line (header or data)
    assert.ok(lines.length > 0, 'CSV should have at least one line');
  
    const expectedFields = [
      'nameID',
      'name',
      'namePoster',
      'birthYr',
      'deathYr',
      'profession',
      'nameTitles'
    ];
    
    const header = lines[0].split(',');

    // Check if the header contains the expected field names
    expectedFields.forEach((field) => {
      assert.ok(header.includes(field), `Expected field "${field}" missing in CSV header`);
    });
  
    // Find the index of the 'originalTitle' field
    const nameIndex = header.indexOf('name');
  
    // If there is data, you can check its format
    if (lines.length > 1) {
    
      const data = lines.slice(1).map((line) => line.split(','));
      // Check if the 'name' field contains "George" in each row
      const nameValues = data.map((row) => row[nameIndex]);
      assert.ok(nameValues.every((value) => value.includes('George')), 'Value "George" not found in name');
    }
  });

  it('should handle healthcheck', () => {
    const output = execSync('se2343 healthcheck').toString();

    // Check if the output contains the "Server is healthy" message
    assert.ok(output.includes('OK'), 'Expected "OK" message');

  });

  it('should handle newtitles', () => {
    const output = execSync('se2343 newtitles --filename titlebasics.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });

  it('should handle newakas', () => {
    const output = execSync('se2343 newakas --filename titleakas.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });

  it('should handle newnames', () => {
    const output = execSync('se2343 newnames --filename namebasics.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });


  it('should handle newcrew', () => {
    const output = execSync('se2343 newcrew --filename titlecrew.tsv').toString();
     // 1. Status Check
     console.log(output)
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });

  it('should handle newepisode', () => {
    const output = execSync('se2343 newepisode --filename titleepisodes.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });

  it('should handle newprincipals', () => {
    const output = execSync('se2343 newprincipals --filename titleprincipals.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });

  it('should handle newratings', () => {
    const output = execSync('se2343 newratings --filename titleratings.tsv').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });
  
  it('should handle resetall', () => {
    const output = execSync('se2343 resetall').toString();
     // 1. Status Check
     const parsedOutput = JSON.parse(output);
     assert.strictEqual(parsedOutput["status"], 'OK', 'Expected status to be "OK"');

  });






});
