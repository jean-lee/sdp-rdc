; (function (name, definition, context) {
  if ((typeof module !== 'undefined') && module.exports)
    module.exports = definition() // node 环境
  else if ((typeof context['define'] === 'function') && (context['define']['amd'] || context['define']['cmd']))
    define(definition)            // amd cmd 规范环境，如 seajs requirejs
  else
    context[name] = definition()  // 浏览器环境
})('MAIN_CONFIG', function () {


  var API_ROOT = 'http://172.20.105.12:10061' // YB IAM 环境

  return {
    API_ROOT,

    // ---------------------------- key ----------------------------
    LOCALSTROAGE_PREFIX: 'sdp_', // localstroage prefix
    TOKEN_KEY: 'sdp_logined_token',           // token key
  }

}, this);