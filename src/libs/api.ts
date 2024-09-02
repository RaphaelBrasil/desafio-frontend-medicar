import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL

if (!baseURL) {
  console.error('NEXT_PUBLIC_DATABASE_URL is not defined')
}

const api = axios.create({
  baseURL: baseURL
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')

    //const token = '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'

    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
