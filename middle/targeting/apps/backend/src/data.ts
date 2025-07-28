import { faker } from '@faker-js/faker'

export function generateDataForEnv(env: string) {
  const environment = {
    id: crypto.randomUUID(),
    name: env,
    description: `This is the ${env} environment`,
  } as const

  const integrations = [
    {
      id: crypto.randomUUID(),
      name: 'ga4',
      displayedName: 'Google Analytics 4',
      description: 'This is the Google Analytics integration',
      icon: 'google-analytics',
      instancesCount: faker.number.int({ min: 0, max: 2 }),
    },
    {
      id: crypto.randomUUID(),
      name: 'heap',
      displayedName: 'Heap',
      description: 'This is the Heap integration',
      icon: 'heap',
      instancesCount: faker.number.int({ min: 0, max: 2 }),
    },
    {
      id: crypto.randomUUID(),
      name: 'mixpanel',
      displayedName: 'Mixpanel',
      description: 'This is the Mixpanel integration',
      icon: 'mixpanel',
      instancesCount: faker.number.int({ min: 0, max: 2 }),
    },
    {
      id: crypto.randomUUID(),
      name: 'fullstory',
      displayedName: 'Fullstory',
      description: 'This is the Fullstory integration',
      icon: 'fullstory',
      instancesCount: faker.number.int({ min: 0, max: 2 }),
    },
    {
      id: crypto.randomUUID(),
      name: 'segmentio',
      displayedName: 'Segment.io',
      description: 'This is the Segment.io integration',
      icon: 'segmentio',
      instancesCount: faker.number.int({ min: 0, max: 2 }),
    },
  ] as const

  const reportingVisitorAttributesProviders = faker.helpers.arrayElements(
    ['mixpanel', 'heap', 'fullstory', 'googleanalytics4', 'segment'],
    {
      min: 0,
      max: 3,
    },
  )

  const reportingVisitorAttributesValues = reportingVisitorAttributesProviders.reduce((acc, partner) => {
    acc[partner] = new Array(
      faker.number.int({
        max: 3,
      }),
    )
      .fill(null)
      .map(() => faker.lorem.slug())

    return acc
  }, {} as Record<string, string[]>)

  return {
    environment,
    integrations,
    reportingVisitorAttributesProviders,
    reportingVisitorAttributesValues,
  }
}
