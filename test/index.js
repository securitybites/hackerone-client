const prompt = require("prompt-sync")();
const util = require('util');
const exec = util.promisify(require('child_process').exec)

async function vulns() {

  const apiKey = "as8dkdfakekey9df23m-a332";

  console.log(apiKey);

  const input = prompt("Enter something: ");
  console.log(`Your input is: ${input}`);

  const { stdout, stderr } = await exec(input);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

}


vulns();