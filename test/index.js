const prompt = require("prompt-sync")();

async function vulns() {

  const apiKey = "as8dkdfakekey9df23m-a332";

  console.log(apiKey);

  const input = prompt("Enter something: ");
  console.log(`Your input is: ${input}`);

}


vulns();