
import { ApiClientFactory, ApiClient } from './../ApiClient';
import { MeteoService } from '..';

/**
 * Service injection context.
 *
 * Holds all the attributes that are injectable in components.
 */
export class ServiceContext {
    private apiClientFactory: ApiClientFactory
    apiClient: ApiClient
    meteoService: MeteoService

    constructor(apiClientFactory: ApiClientFactory) {
        this.apiClientFactory = apiClientFactory
    }

     /**
     * Initialize the injectable attributes by building them.
     */
    init(): Promise<ServiceContext> {
        const context: ServiceContext = this
        return this.apiClientFactory.newApiClient().then((apiClientAndConfig) => {
            const { apiClient, envConfig } = apiClientAndConfig
            const { url } = envConfig
            context.apiClient = apiClient
            context.meteoService = new MeteoService(apiClient)
            return context
        })
    }

}