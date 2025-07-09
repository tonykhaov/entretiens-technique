import { faker } from '@faker-js/faker'
import { buildConfig } from './config.js'

export function buildConnector() {
  const configs = new Array(faker.number.int({ min: 1, max: 5 })).fill(null).map(() => buildConfig())

  return {
    id: crypto.randomUUID(),
    name: faker.lorem.word(),
    displayed_name: faker.lorem.sentence(),
    db_name: faker.lorem.slug(),
    connector_id: faker.lorem.word(),
    icon: faker.lorem.word(),
    documentation_path: faker.internet.url(),
    description: null,
    has_segment_values: false,
    metadata: {
      card_description: faker.lorem.paragraph(),
      card_title: faker.lorem.sentence(),
      card_tag: faker.lorem.word(),
      modal_description: faker.lorem.paragraph(),
      modal_uses_cases: new Array(faker.number.int({ min: 1, max: 5 })).fill(null).map(() => faker.lorem.paragraph()),
      modal_documentation: faker.internet.url(),
    },
    configs,
  }
}
