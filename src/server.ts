import * as Path from 'path'
import * as Hapi from 'hapi'
import * as Dotenv from 'dotenv'
import * as MongoModels from 'hapi-mongodb-models'
import * as Blipp from 'blipp'
import * as Good from 'good'

const {NODE_ENV = 'development'} = process.env
if (NODE_ENV !== 'production') {
  // when testing load env vars from .env.test
  const sufx = NODE_ENV !== 'development' ? '.test' : ''
  Dotenv.config({path: Path.resolve(__dirname, '..', `.env${sufx}`)})
}

import config from './config'

export class Server {
  private static _instance: Hapi.Server

  public static async start(): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        host: config.server.host,
        port: config.server.port,
      })

      // register plugins to server instance
      let devPlugins = []
      if (config.isDev) {
        devPlugins = [Blipp]
      }

      // don't register good when testing
      if (!config.isTest) {
        devPlugins = [
          {
            plugin: Good,
            options: config.logging,
          },
          ...devPlugins,
        ]
      }

      await Server._instance.register([
        ...devPlugins,
        {
          plugin: MongoModels,
          options: config.mongo,
        },
      ])

      Server._instance.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          return {message: 'Hello, World!'}
        },
      })

      await Server._instance.start()

      Server._instance.log(
        'info',
        `Server started → ${Server._instance.info.uri}`,
      )

      return Server._instance
    } catch (err) {
      throw err
    }
  }

  public static stop(): Promise<Error | null> {
    Server._instance.log('info', 'Server - Stopping!')

    return Server._instance.stop()
  }

  public static async recycle(): Promise<Hapi.Server> {
    await Server.stop()

    return await Server.start()
  }

  public static instance(): Hapi.Server {
    return Server._instance
  }

  public static async inject(
    options: string | Hapi.InjectedRequestOptions,
  ): Promise<Hapi.InjectedResponseObject> {
    return await Server._instance.inject(options)
  }
}
