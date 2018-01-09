import * as Path from 'path'
import * as Hapi from 'hapi'
import * as Dotenv from 'dotenv'
import Plugins from './plugins'

const {NODE_ENV = 'development'} = process.env
if (NODE_ENV !== 'production') {
  const sufx = NODE_ENV !== 'development' ? '.test' : ''
  Dotenv.config({path: Path.resolve(__dirname, '..', `.env${sufx}`)})
}

import config from './config'

export class Server {
  private static _config: any = config
  private static _instance: Hapi.Server

  public static config(): any {
    return Server._config
  }

  public static async start(): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        host: config.server.host,
        port: config.server.port,
      })

      await Plugins.register(Server._instance, config)
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
}
