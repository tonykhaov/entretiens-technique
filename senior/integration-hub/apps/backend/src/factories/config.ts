import { faker } from '@faker-js/faker'

export function buildConfig() {
  return {
    id: crypto.randomUUID(),
    type: 'string',
    title: faker.lorem.word(),
    label: faker.lorem.word(),
    placeholder: faker.lorem.word(),
    default_value: faker.helpers.arrayElement([null, faker.lorem.word()]),
    is_secret: false,
    is_required: true,
  }
}
