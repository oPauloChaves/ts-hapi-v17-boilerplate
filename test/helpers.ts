import * as Hapi from 'hapi'
import * as Lab from 'lab'
import * as Code from 'code'
import {Server} from '../src/server'

const L = (exports.lab = Lab.script())
const expect = Code.expect

export interface IPayload<T> {
  status: number
  data: T
}

export const startServer = async (): Promise<Hapi.Server> => {
  if (Server.instance() === undefined) {
    return await Server.start()
  }

  return await Server.recycle()
}

export const stopServer = async (): Promise<Error | null> => {
  return await Server.stop()
}

export const extractPayload = <T>(
  response: Hapi.InjectedResponseObject,
): IPayload<T> => {
  const payload = JSON.parse(response.payload) as IPayload<T>

  return payload
}

