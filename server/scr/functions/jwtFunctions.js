const jwt = require('jsonwebtoken')
const { config } = require('../config/config');

const generateToken = (schemaModel) => {
  return jwt.sign({ name: schemaModel.name })
}
