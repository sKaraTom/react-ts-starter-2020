import React from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/scss/main.scss'
import { TestComponent } from './components';
import { ServiceContext, InjectionProvider } from './services';

/**
 * Props of the App component.
 */
interface Props {
  /** A function to setup the service context object. */
  serviceContextFactory: Function
}

/**
 * State of the App component.
 */
interface State {
  serviceContext: ServiceContext | null
  initError: any | null
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { serviceContext: null, initError: null }
  } 

  componentDidMount() {
    // Build the service context
    this.props
    .serviceContextFactory()
    .then((serviceContext) => {
        console.log(serviceContext)
        this.setState({ serviceContext })
    })
    .catch((error) => {
        console.log(error)
        this.setState({ initError: error })
    })
  }

  render() {
    return (
      <InjectionProvider value={this.state.serviceContext}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
              <TestComponent />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </InjectionProvider>
    );
  }

}

export default App;
