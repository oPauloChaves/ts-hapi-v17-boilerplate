import * as Hapi from 'hapi'
import * as MongoModels from 'hapi-mongodb-models'
import * as Blipp from 'blipp'
import * as Good from 'good'
import AppRoutes from './routes'

export default class Plugins {
  public static async register(server: Hapi.Server, config): Promise<any> {
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

    await server.register([
      ...devPlugins,
      {
        plugin: MongoModels,
        options: config.mongo,
      },
      {
        plugin: AppRoutes,
        options: config,
      },
    ])
  }
}
