import * as Path from 'path'
import * as Joi from 'joi'

const envVarsSchema = Joi.object({
  MONGODB_URI: Joi.string()
    .uri({scheme: 'mongodb'})
    .required(),
})
  .unknown()
  .required()

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Mongo Config validation error: ${error.message}`)
}

export default {
  mongo: {
    url: envVars.MONGODB_URI,
    rootDir: Path.join(__dirname, '..'),
  },
}
