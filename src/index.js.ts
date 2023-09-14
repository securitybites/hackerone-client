import request from "request-promise-native";

interface RequestOptions {
  uri: string;
  auth: {
    user: string;
    pass: string;
  };
}

class HackeroneClient {
  private h1Key: string;
  private h1Key_name: string;
  private h1BaseUrl: string = "https://api.hackerone.com/v1/";
  private options: RequestOptions;

  constructor(h1_key: string, h1_key_name: string) {
    if (!h1_key || !h1_key_name) {
      throw new Error(
        "Hackerone API key and API key name" + " must be defined"
      );
    }

    this.h1Key = h1_key;
    this.h1Key_name = h1_key_name;

    this.options = {
      uri: this.h1BaseUrl,
      auth: {
        user: this.h1Key_name,
        pass: this.h1Key,
      },
    };
  }

  async getPrograms(): Promise<string> {
    const options = { ...this.options };
    options.uri += "me/programs";

    const result = await request(options).catch((err: any) => {
      throw new Error(err);
    });

    return result;
  }

  async verifyAccess(): Promise<void> {
    const options = { ...this.options };
    options.uri += "users/" + this.h1Key_name;
    await request(options).catch((err: any) => {
      throw new Error(err);
    });
  }

  async swag(programId: string): Promise<string> {
    const options = { ...this.options };
    options.uri += "programs/" + programId + "/swag";

    const result = await request(options).catch((err: any) => {
      throw new Error(err);
    });

    return result;
  }

  async readReport(reportNumber: string): Promise<string> {
    const options = { ...this.options };
    options.uri += "reports/" + reportNumber;

    const result = await request(options).catch((err: any) => {
      throw new Error(err);
    });

    return result;
  }

  async queryReports(
    program: string,
    additionalFilters?: Record<string, string>
  ): Promise<any[]> {
    const options = { ...this.options };

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
    let totalResult: any[] = [];

    while (nextPage) {
      await request(options)
        .then((result: string) => {
          let jsonResult = JSON.parse(result);
          totalResult.push(jsonResult.data);
          if (typeof jsonResult.links.next == "undefined") {
            //End of paginated results
            nextPage = false;
          } else {
            options.uri = jsonResult.links.next;
          }
        })
        .catch((err: any) => {
          throw new Error(err);
        });
    }

    return totalResult;
  }
}

export = HackeroneClient;
