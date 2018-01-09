import * as Hapi from 'hapi'
import * as Lab from 'lab'
import * as Code from 'code'
import {Server} from '../src/server'

const L = (exports.lab = Lab.script())
const expect = Code.expect

L.describe('Server', () => {
  let server: Hapi.Server

  L.before(async () => {
    server = await Server.start()
  })

  L.after(async () => {
    await Server.stop()
  })

  L.it('[GET] / should return 200 status', async () => {
    const options = {method: 'GET', url: '/'}
    const response = await server.inject(options)
    expect(response.statusCode).to.be.equal(200)
  })
})
