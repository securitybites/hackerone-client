![](img/hackerone_node.png)

# Hackerone - Node Client
> A Hackerone client written in Node.js to make life easier when interacting with the Hackerone API.

## How to Use:

Create the client object using your Hackerone API key and key name:
```
const Hackerone = new HackeroneClient(process.env.HACKERONE_API_KEY,
process.env.HACKERONE_API_KEY_NAME);
```

Get a specific report:

```
const reportDetails = await Hackerone.readReport("519221");
```

Query for all reports in the program:

```
const reports = await Hackerone.queryReports('lifeomic');
```


Query for reports using filters:

```
//Available filters to choose from: https://api.hackerone.com/docs/v1#/reports/query

const additionalFilters = {
        "filter[reporter][]": "randomdeduction",
        "filter[swag_awarded_at_null][]": "true"
    };

const reports = await Hackerone.queryReports('lifeomic',
     additionalFilters);
```



## Contributing

1. Clone this repo
2. Hack away
3. Create a new pull request

#### Author

Jesse Kinser 

- H1: randomdeduction
- Twitter: @securitybites