# Distributed URL Shortener Service

A scalable, distributed URL shortening service built with AWS Lambda, API Gateway, and DynamoDB. It can handle millions of requests daily using consistent hashing for load distribution and serverless infrastructure to optimize cost and scalability.

---

## Features

- Shortens long URLs into compact base62-encoded short codes.
- Redirects short URLs to original long URLs with HTTP 301.
- Uses consistent hashing to evenly distribute keys across logical shards.
- Serverless architecture using AWS Lambda and API Gateway.
- DynamoDB with on-demand capacity for cost-effective storage.
- Infrastructure managed by AWS SAM for easy deployment.

---

## Folder Structure
shortener-api/
├── template.yaml # AWS SAM template for resources
├── functions/
│ ├── shorten.js # Lambda to shorten URLs
│ ├── redirect.js # Lambda to redirect short URLs
│ ├── package.json # Node.js dependencies
│ └── node_modules/ # Installed dependencies
├── utils/
│ ├── base62.js # Base62 encoding helper
│ └── consistentHash.js # Consistent hashing helper
├── event-shorten.json # Sample event for shorten function local invoke
├── event-redirect.json # Sample event for redirect function local invoke
└── README.md # This file

## Setup & Deployment

### Prerequisites

- AWS Account with permissions to create Lambda, API Gateway, DynamoDB, IAM roles.
- AWS CLI configured (`aws configure`)
- AWS SAM CLI installed
- Node.js 18.x

### Steps

1. Clone the repo:

   ```bash
   git clone <your-repo-url>
   cd shortener-api

2. Install dependencies:

  cd functions
  npm install
  cd ..

3. Build the project:
     sam build
4. Deploy to AWS (guided):
     sam deploy --guided


### USAGE
# Shorten a URL
Send a POST request to:
https://<api-id>.execute-api.<region>.amazonaws.com/Prod/shorten
With JSON body:
{
  "url": "https://example.com"
}

Response:
{
  "shortUrl": "https://<api-gateway-url-or-custom-domain>/<shortCode>"
}

# Redirect a Short URL
Open in a browser or send GET request:
https://<api-id>.execute-api.<region>.amazonaws.com/Prod/<shortCode>
This will redirect (HTTP 301) to the original long URL.




