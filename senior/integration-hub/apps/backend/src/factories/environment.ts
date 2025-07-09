import { faker } from '@faker-js/faker'
import type { buildConnector } from './connector.js'

export function buildEnvironment(connectors: ReturnType<typeof buildConnector>[]) {
  return {
    id: crypto.randomUUID(),
    name: faker.word.noun(),
    connectors: connectors.map((connector) => ({
      ...connector,
    })),
  }
}
