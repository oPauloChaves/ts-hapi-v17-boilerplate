import {Server} from './server'

;(async () => {
  try {
    await Server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
