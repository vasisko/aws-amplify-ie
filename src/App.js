import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Amplify App Ex:<br />
          We now have Auth!
        </p>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
