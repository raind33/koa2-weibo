/**
 * @description json schema校验工具
 * @author rain
 */

const Ajv = require('ajv')

const ajv = new Ajv()

/**
 * 
 * @param {obj} schema 
 * @param {obj} data 
 */
function validate(schema, data={}) {
  const valid = ajv.validate(schema, data)
   
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
