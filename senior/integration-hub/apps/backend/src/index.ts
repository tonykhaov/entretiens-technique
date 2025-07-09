import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { buildEnvironment } from './factories/environment.js'
import { buildConnector } from './factories/connector.js'
import { buildInstance } from './factories/instance.js'
import { faker } from '@faker-js/faker'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors())

const connectors = new Array(10).fill(null).map(() => buildConnector())
const environments = new Array(4).fill(null).map(() => buildEnvironment(connectors))

app.get('/environments', (c) => {
  return c.json(
    environments.map((env) => ({
      id: env.id,
      name: env.name,
    })),
  )
})

app.get('/connectors/:environmentId', (c) => {
  const environmentId = c.req.param('environmentId')
  const connectorsForEnvironment = environments.find((env) => env.id === environmentId)?.connectors

  if (!connectorsForEnvironment) {
    return c.json({ error: 'Environment not found' }, 404)
  }

  const connectorsForEnvironmentWithInstances = connectorsForEnvironment.map((connector) => {
    const instances = new Array(faker.number.int({ min: 0, max: 2 }))
      .fill(null)
      .map(() => buildInstance(connector.configs))

    return {
      ...connector,
      instances,
    }
  })

  return c.json(connectorsForEnvironmentWithInstances)
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
