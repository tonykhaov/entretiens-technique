## Technical Test – Senior React Developer

Create a mini campaign viewer using the given APIs.

## Prerequisites

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/) v22 or later

## Setup Instructions

1. Run `pnpm install` to install dependencies.
2. Start the backend and frontend with `pnpm --parallel dev`.

## API

**Base URL:** `http://localhost:3000`

- `GET /campaigns`
- `GET /environments`
- `GET /integrations/:environmentId`

The following endpoints require the header: `x-source: flagship`

- `GET /reporting/:environmentId/visitorAttributesProviders`
- `GET /reporting/:environmentId/visitorAttributesValues?partner={partner}`

## Tasks

1. Display all campaigns with:

   - Name
   - Description
   - Status

2. Show the name of the environment associated with each campaign.

3. Below each campaign, add a dropdown listing integrations for its environment.

4. Modify dropdown logic:
   - Show only integrations with at least one instance or one visitor attribute value.
   - If an integration has an instance but no value, it should be visible but not selectable.
   - If it has at least one instance and one value, it should be selectable.
