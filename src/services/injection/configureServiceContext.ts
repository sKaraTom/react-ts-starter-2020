import { ServiceContext } from './ServiceContext'
import { ApiClientFactory } from '../ApiClient'

export function configureServiceContext(
    ClientFactory: new () => ApiClientFactory = ApiClientFactory,
): Promise<ServiceContext> {
    const apiClientFactory = new ClientFactory()
    const serviceContext = new ServiceContext(apiClientFactory)
    return serviceContext.init()
}