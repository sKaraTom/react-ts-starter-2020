
import * as React from 'react';
import { IMeteoServiceInjectable } from '../services/injection/injector';
import { inject } from './../services';

export type TestProps = IMeteoServiceInjectable & {}

export class Test extends React.Component<TestProps> {

    constructor(props: TestProps) {
        super(props)
    }

    componentDidMount() {
        this.props.meteoService.getCityWeather("Montpellier", "FR").then(res => {
            console.log(res)
        })
    }

    render() {
        return ( 
        <React.Fragment>
            <div> my test div </div>
            <button className="button-test"> test button </button>
        </React.Fragment>
        )
    }

}

export const TestConnect = inject(Test)