import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

interface EnvironmentConfig {
    url: string
}

interface ApiInitConfig {
    apiClient: ApiClient
    envConfig: EnvironmentConfig
}

export class ApiClientFactory {

    newApiClient(): Promise<ApiInitConfig> {
        const configAxios: AxiosRequestConfig = {
            timeout: 30000,
        }
        const axiosInstance = axios.create(configAxios)

        const apiClient = new ApiClient(axiosInstance)
        return new Promise((resolve, reject) => {
            apiClient
                .init()
                .then((envConfig) => resolve({ apiClient, envConfig }))
                .catch(reject)
        })
    }
}

export class ApiClient {
    private _axiosInstance: AxiosInstance
    private baseURL: string | null

    constructor(axiosInstance: AxiosInstance) {
        this._axiosInstance = axiosInstance
        this.baseURL = null
    }

    init() {
        return this._axiosInstance
            .get(`${process.env.PUBLIC_URL}/env-config.json`)
            .then((response) => {
                if (200 === response.status) {
                    this.baseURL = response.data.weatherUrl
                    console.log(this.baseURL)
                    return response.data
                } else {
                    throw new Error(`No URL file found, due to invalid HTTP response code ${response.status}`)
                }
            })
            .catch((error) => {
                console.error(error)
                throw new Error('Failed to find URL file')
            })
    }

    get(suffixUrl: string): Promise<any> {
        return this._axiosInstance
            .get(`${this.baseURL}${suffixUrl}`)
            .then((axiosResponse: AxiosResponse) => {
                return Promise.resolve(axiosResponse)
            })
            .catch((error) => Promise.reject(error))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(suffixUrl: string, data: any): Promise<any> {
        return this._axiosInstance
            .post(`${this.baseURL}${suffixUrl}`, data)
            .then((axiosResponse: AxiosResponse) => {
                return this.getPromiseFromStatus(axiosResponse)
            })
            .catch((error) => Promise.reject(error))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put(suffixUrl: string, data: any): Promise<any> {
        return this._axiosInstance
            .put(`${this.baseURL}${suffixUrl}`, data)
            .then((axiosResponse: AxiosResponse) => {
                return Promise.resolve(axiosResponse.data)
            })
            .catch((error) => Promise.reject(error))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete(suffixUrl: string): Promise<any> {
        return this._axiosInstance
            .delete(`${this.baseURL}${suffixUrl}`)
            .then((axiosResponse: AxiosResponse) => {
                return Promise.resolve(axiosResponse.data)
            })
            .catch((error) => Promise.reject(error))
    }

    private getPromiseFromStatus(axiosResponse: AxiosResponse): Promise<any> | Promise<never> {
        const { status } = axiosResponse
        if (status === 200 || status === 201) {
            const {
                data: { response },
            } = axiosResponse

            if (response.items) {
                return Promise.resolve(response.items)
            } else if (response.item) {
                return Promise.resolve(response.item)
            } else if (response.id) {
                return Promise.resolve(response.id)
            } else {
                return Promise.resolve(response)
            }
        } else {
            return Promise.reject(new Error(`error status ${status}`))
        }
    }
}

const apiClient = new ApiClient(axios)

export default apiClient