import React, {useState, useCallback} from "react"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import './App.css';
import NewPlace from './pages/Places/NewPlaces-Page';
import Users from './pages/Users/Users-Page';
import UserPlaces from "./pages/Places/UserPlaces"
import MainNavigation from "./Shared/Components/Navigation/Main-Header/MainNavigation"
import Editplace from "./pages/Places/EditPlaces";
import Auth from "./pages/Authentication/Auth";
import {AuthContext} from "./Shared/Components/Context/auth-context"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid) =>
  {
    setIsLoggedIn(true)
    setUserId(uid);
  },[])
  const logout = useCallback(() =>
  {
    setIsLoggedIn(false)
    setUserId(null);
  },[])
  let routes;
  if(isLoggedIn)
  {
    routes = (
    <Switch>
      <Route path = "/" exact>
        <Users />
      </Route>
      <Route path = "/:uID/places" exact>
        <UserPlaces />
      </Route>
      <Route path = "/places/new" exact>
        <NewPlace/>
      </Route>
      <Route path = "/places/:placeID">
        <Editplace />
      </Route>
      <Redirect to = "/"/>
    </Switch>
    )
  }
  else{
    routes = (
    <Switch>
      <Route path = "/" exact>
        <Users />
      </Route>
      <Route path = "/:uID/places" exact>
        <UserPlaces />
      </Route>
      <Route path = "/auth" exact>
        <Auth />
      </Route>
      <Redirect to = "/auth"/>
    </Switch>
    )
  }
  return (
    <div className="App">
      <AuthContext.Provider value = {
          {
            isLoggedIn: isLoggedIn, 
            login: login, 
            logout: logout,
            userId : userId
          }
        
        }>
        <Router>
        <MainNavigation />
          <main>
            <Switch>
              {routes}
            </Switch>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
