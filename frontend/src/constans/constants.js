export const API_URL = process.env.NODE_ENV !== 'production' ? 'http://172.23.79.8:5000/api' : 'deployUrl'
export const LOCAL_STORAGE_TOKEN_NAME = 'accessToken'
export const LOCAL_STORAGE_REFRESH_TOKEN_NAME = 'refreshToken'
export const TYPE = {
    SET_AUTH: 'SET_AUTH',
    LOAD_TYPES: 'LOAD_TYPES',
    LOAD_CATEGORIES:'LOAD_CATEGORIES',
    LOAD_PRODUCTS:'LOAD_PRODUCTS',
}
export const STATIC_URL = 'http://172.23.79.8:5000/'
