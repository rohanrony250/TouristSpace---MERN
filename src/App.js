import React, {useState, useCallback} from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
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

  const login = useCallback(() =>
  {
    setIsLoggedIn(true)
  },[])
  const logout = useCallback(() =>
  {
    setIsLoggedIn(false)
  },[])
  return (
    <div className="App">
      <AuthContext.Provider value = {{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
        <Router>
        <MainNavigation />
          <main>
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
              <Route path = "/auth" exact>
                <Auth />
              </Route>
            </Switch>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
