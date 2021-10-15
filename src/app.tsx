import Start from './views/start/start';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Login from './views/auth/login/login';
import Signup from './views/auth/signup/signup';
import Logout from './views/auth/logout/logout';
import Welcome from './views/welcome/welcome';
import Dashboard from './views/dashboard/dashboard';
import './app.css';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' component={Start} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/welcome' component={Welcome} exact />
          <Route path='/dashboard' component={Dashboard} exact />
        </Switch>
      </Router>
    </div>
  )
}

export default App
