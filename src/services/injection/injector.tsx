import * as React from 'react'
import * as hoistStatics from 'hoist-non-react-statics'
import { ServiceContext } from './ServiceContext'
import { MeteoService } from '..';



const hoistNonReactStatic: any = hoistStatics // eslint-disable-line

// Injection context declaration
const InjectionContext = React.createContext<ServiceContext | null>(null)
// React context provider component naming alias
export const InjectionProvider = InjectionContext.Provider

export interface IMeteoServiceInjectable {
    meteoService: MeteoService
}

/**
 * Performs dependency injection on the component.
 *
 * @param InjectableComponent Component that will get dependencies injected.
 */
export const inject = (InjectableComponent: any) => {
    // Creation object Injected
    // eslint-disable-next-line
    class Injected extends React.Component<any> {
        static displayName = `Inject(${InjectableComponent.displayName || InjectableComponent.name || 'Component'})`
        static contextType = InjectionContext
        context!: React.ContextType<typeof InjectionContext>
        render() {
            if (null === this.context) {
                return false
            } else {
                return (
                    <InjectableComponent
                        {...this.props}
                        meteoService={this.context.meteoService}
                    />
                )
            }
        }
    }
    // add static function on injectable component
    hoistNonReactStatic(Injected, InjectableComponent)
    return Injected
}