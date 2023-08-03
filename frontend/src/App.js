import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SingleSpot from "./components/SingleSpot"
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpotForm";
import Bookings from "./components/Bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotList />
          </Route>
          <Route exact path='/spots/new'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SingleSpot />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route exact path='/bookings/current'>
            <Bookings />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;