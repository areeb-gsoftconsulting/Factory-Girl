import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";

const Routes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/:id">
          <HomePage />
        </Route>

        <Route exact path="/">
          <WelcomePage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
