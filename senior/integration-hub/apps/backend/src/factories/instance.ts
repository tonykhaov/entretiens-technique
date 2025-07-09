import { faker } from '@faker-js/faker'
import { buildConfig } from './config.js'

export function buildInstance(configs: ReturnType<typeof buildConfig>[]) {
  return {
    id: crypto.randomUUID(),
    name: faker.word.noun(),
    configs: configs.map((template) => ({
      id: crypto.randomUUID(),
      value: '',
      config_template: template,
    })),
  }
}
