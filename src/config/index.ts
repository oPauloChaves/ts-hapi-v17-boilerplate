import common from './common'
import server from './server'
import logging from './logging'
import mongo from './mongo'

export default {
  ...common,
  ...server,
  ...logging,
  ...mongo,
}
