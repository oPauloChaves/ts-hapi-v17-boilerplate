import * as Hapi from 'hapi'
import * as Lab from 'lab'
import * as Code from 'code'
import {Server} from '../../../src/server'

const L = (exports.lab = Lab.script())
const expect = Code.expect
const config = Server.config()

L.describe('Server', () => {
  let server: Hapi.Server
  const API_URL = `${config.api.basePath}/users`

  L.before(async () => {
    server = await Server.start()
  })

  L.after(async () => {
    await Server.stop()
  })

  L.it(`[GET] ${API_URL} should return 200 status`, async () => {
    const options = {method: 'GET', url: API_URL}
    const response = await server.inject(options)
    expect(response.statusCode).to.be.equal(200)
  })
})
