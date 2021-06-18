let envVariables = {}
switch(process.env.NODE_ENV) {
    case 'production': envVariables = require('./prod'); break
    default: envVariables = require('./dev'); break
}

module.exports = envVariables