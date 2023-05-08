import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import styles from "./home.module.css";
import { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import Header from "../../components/Header";
import CardsContainer from "../../components/Card/CardsContainer";
import CategoryContainer from "../../components/CategoryContainer";
import Cart from "../../components/Cart";
import { chatApi } from "../../services/chatApi";
import VoiceInput from "../../components/MicComp/VoiceInput";

const HomePage: React.FC = () => {
  const [text, setText] = useState("");
  const handleStart = () => {
    console.log("Recording started");
  };

  const handleStop = (inputText: string) => {
    setText(inputText);
  };
  return (
    <IonContent className={styles.mainHome}>
      <IonGrid>
        <IonRow>
          <IonCol size-lg="9" sizeXl="9" size-md="12" size-sm="12" sizeXs="12">
            <Header />
            {/* <CardsContainer /> */}
            <CategoryContainer />
          </IonCol>
          <IonCol size="2.5" sizeXl="3" size-lg="3" size-md="2">
            <div className={styles.cartDisplay}>
              <Cart />
            </div>
            <div className={styles.cartModalDisplay}>
              <h1>portion</h1>
            </div>
          </IonCol>
        </IonRow>
        <VoiceInput onStart={handleStart} onStop={handleStop} />
      </IonGrid>
    </IonContent>
  );
};

export default HomePage;
