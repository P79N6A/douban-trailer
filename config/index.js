const AgentKeepAlive = require('agentkeepalive');
module.exports = {
  'ossconfig': {
    accessKeyId: 'LTAI7x3i2ioKHJVS',
    accessKeySecret: 'WFbYPF9M9TK3yn8YIA5SccDv7NYr3n',
    bucket: 'iuap-tenat-market',
    region: 'oss-cn-beijing',
    agent: new AgentKeepAlive({
      timeout: '30m',
    }),
    timeout: '30m',
  }
}
