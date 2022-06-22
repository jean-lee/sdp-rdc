
const W = window

const CONFIG = W.MAIN_CONFIG
if (!CONFIG) { console.error('主配置文件 MAIN_CONFIG.js 不存在，请检查!') }

export const LOCALSTROAGE_PREFIX = CONFIG.LOCALSTROAGE_PREFIX || 'sdp-rdc_' // localstroage prefix
export const TOKEN_KEY = CONFIG.TOKEN_KEY || 'sdp-rdc_token' // token key

// ---------------------------- 开发环境判断 ----------------------------
export const ENV = { is_dev: process.env.NODE_ENV === 'development' }
export function IS_DEV() { return CONFIG.__DEV__ }
W.IS_DEV = IS_DEV

// ---------------------------- cache config ----------------------------
export const DISABLED_EXPIRE = 666666 // 不设置缓存

export const API_ROOT = CONFIG.API_ROOT // API 根路径
