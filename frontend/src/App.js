import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFromPage";

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <h1>Hello from Home Page</h1>
      </Route>
      <Route path='/login'>
        < LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
