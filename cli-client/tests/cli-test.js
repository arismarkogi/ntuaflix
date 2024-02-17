const { execSync } = require('child_process');
const {expect} = require('chai')

describe('CLI Tests', () => {
  // Example for testing JSON format
  it('should handle title command with JSON format', () => {
    const output = execSync('node your-cli-script.js se23XX title --titleID tt0000929 --format json').toString();
    const parsedOutput = JSON.parse(output);
    expect(parsedOutput).to.have.property('titleID').to.equal('tt0000929');
  });

  // Example for testing CSV format
  it('should handle title command with CSV format', () => {
    const output = execSync('node your-cli-script.js se23XX title --titleID 123 --format csv').toString();
    // Add assertions for CSV format output...
  });
});
