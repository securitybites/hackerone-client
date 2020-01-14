const request = require("request-promise-native");

class HackeroneClient {
  constructor(h1_key, h1_key_name) {
    if (!h1_key || !h1_key_name) {
      throw new Error(
        "Hackerone API key and API key name" + " must be defined"
      );
    }

    this.h1Key = h1_key;
    this.h1Key_name = h1_key_name;
    this.h1BaseUrl = "https://api.hackerone.com/v1/";

    this.options = {
      uri: this.h1BaseUrl,
      auth: {
        user: this.h1Key_name,
        pass: this.h1Key,
      },
    };
  }

  async verifyAccess() {
    const options = Object.assign({}, this.options);
    options.uri += "users/" + this.h1Key_name;
    await request(options).catch(function(err) {
      throw new Error(err);
    });
  }

  async readReport(reportNumber) {
    const options = Object.assign({}, this.options);
    options.uri += "reports/" + reportNumber;

    const result = await request(options).catch(function(err) {
      throw new Error(err);
    });

    return result;
  }

  async queryReports(program, additionalFilters) {
    const options = Object.assign({}, this.options);

    if (additionalFilters) {
      options.uri += "reports?filter[program][]=" + program;
      for (const key in additionalFilters) {
        let value = additionalFilters[key];
        options.uri += "&" + key + "=" + value;
      }
    } else {
      options.uri += "reports?filter[program][]=" + program;
    }

    let nextPage = true;
    let totalResult = [];

    while (nextPage) {
      await request(options)
        .then(function(result) {
          let jsonResult = JSON.parse(result);
          totalResult.push(jsonResult.data);
          if (typeof jsonResult.links.next == "undefined") {
            //End of paginated results
            nextPage = false;
          } else {
            options.uri = jsonResult.links.next;
          }
        })
        .catch(function(err) {
          throw new Error(err);
        });
    }

    return totalResult;
  }
}

module.exports = HackeroneClient;
