import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
//pages
import Dashboard from './pages/dashboard/DashBoard'
import Login from './pages/login/Login'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import SignUp from './pages/signup/SignUp'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useAuthContext } from './hooks/useAuthContext'
import OnlineUsers from './components/OnlineUsers'
function App() {
  //npm start to run
  const { user, authIsReady} = useAuthContext()
  return (
    <div className="App">
      {/*(authIsReady) Only render all the application when authentication is ready*/}
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar/>}
          <div className='container'>
            <Navbar/>
            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to='/login'/>}
                {user &&<Dashboard/>}
              </Route>
              <Route path='/create'>
                {!user && <Redirect to='/login'/>}
                {user &&<Create/>}
              </Route>
              <Route path='/projects/:id'>
                {!user && <Redirect to='/login'/>}
                {user &&<Project/>}
              </Route>
              <Route path='/login'>
                {user && <Redirect to='/'/>}
                {!user &&<Login/>}
              </Route>
              <Route path='/signup'>
                {user && <Redirect to='/'/>}
                {!user && <SignUp/>}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
