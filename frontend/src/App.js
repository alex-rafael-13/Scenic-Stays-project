import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFromPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from './store/session'
import SignupFormPage from "./components/SignupFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
