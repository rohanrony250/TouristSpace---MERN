// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import './App.css';
import NewPlace from './pages/Places/NewPlaces-Page';
import Users from './pages/Users/Users-Page';

function App() {
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route path = "/" exact>
           <Users />
         </Route>
         <Route path = "/places/new" exact>
            <NewPlace/>
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
