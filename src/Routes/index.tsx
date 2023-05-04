import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import WelcomePage from "../pages/WelcomePage";

const Routes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <WelcomePage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Routes;
