import * as Hapi from 'hapi'

export class Server {
  private static _instance: Hapi.Server

  public static async start(): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        host: '0.0.0.0',
        port: 3001,
      })

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
