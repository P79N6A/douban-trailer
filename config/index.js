const AgentKeepAlive = require('agentkeepalive');
module.exports = {
  'ossconfig': {
    accessKeyId: '***',
    accessKeySecret: '**',
    bucket: 'iuap-tenat-market',
    region: 'oss-cn-beijing',
    agent: new AgentKeepAlive({
      timeout: '30m',
    }),
    timeout: '30m',
  }
}
