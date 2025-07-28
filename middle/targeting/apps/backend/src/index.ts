import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { generateDataForEnv } from './data.js'
import { cors } from 'hono/cors'

const data = {
  production: generateDataForEnv('production'),
  staging: generateDataForEnv('staging'),
  dev: generateDataForEnv('dev'),
}

const app = new Hono()

app.use(cors())
app.use('/reporting/*', async (c, next) => {
  if (c.req.header('x-source') !== 'flagship') {
    return c.json(
      {
        message: 'Invalid x-source header',
      },
      401,
    )
  }

  return next()
})

app.get('/reporting/:environmentId/visitorAttributesValues', (c) => {
  const environmentId = c.req.param('environmentId')
  const foundData = Object.entries(data).find(([, data]) => {
    if (data.environment.id === environmentId) {
      return true
    }
  })

  if (!foundData) {
    return c.json(
      {
        message: 'Environment not found',
      },
      404,
    )
  }

  const partner = c.req.query('partner')

  if (!partner) {
    return c.json(
      {
        message: 'Missing partner query parameter',
      },
      400,
    )
  }

  const partnerValues = foundData[1].reportingVisitorAttributesValues[partner]
  return c.json({
    data: partnerValues,
  })
})

app.get('/reporting/:environmentId/visitorAttributesProviders', (c) => {
  const environmentId = c.req.param('environmentId')

  const foundData = Object.entries(data).find(([, data]) => {
    if (data.environment.id === environmentId) {
      return true
    }
  })

  if (!foundData) {
    return c.json(
      {
        message: 'Environment not found',
      },
      404,
    )
  }

  return c.json({
    data: foundData[1].reportingVisitorAttributesProviders,
  })
})

app.get('/campaigns', (c) => {
  return c.json({
    data: [
      {
        id: 1,
        name: 'Campaign 1',
        description: 'This is the first campaign',
        status: 'live',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        environmentId: data.production.environment.id,
      },

      {
        id: 2,
        name: 'Campaign 2',
        description: 'This is the second campaign',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        environmentId: data.staging.environment.id,
      },

      {
        id: 3,
        name: 'Campaign 3',
        description: 'This is the third campaign',
        status: 'paused',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        environmentId: data.dev.environment.id,
      },
    ],
  })
})

app.get('/environments', (c) => {
  return c.json({
    data: Object.entries(data).map(([env, data]) => ({
      id: data.environment.id,
      name: data.environment.name,
      description: data.environment.description,
    })),
  })
})

app.get('/integrations/:environmentId', (c) => {
  const environmentId = c.req.param('environmentId')

  const foundData = Object.entries(data).find(([, data]) => {
    if (data.environment.id === environmentId) {
      return true
    }
  })

  if (!foundData) {
    return c.json(
      {
        message: 'Environment not found',
      },
      404,
    )
  }

  return c.json({
    data: foundData[1].integrations,
  })
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
