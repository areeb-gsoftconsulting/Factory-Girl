import { IonContent, IonButton } from "@ionic/react";
import styles from "./welcome.module.css";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {
  const history = useHistory();
  const goToResturant = () => {
    history.push("/factory-girl");
  };

  return (
    <IonContent>
      <div className={styles.row}>
        <div className={`${styles.block} ${styles.block1}`}>
          <div className={styles.blockContent}>
            <h1>Factory Girl</h1>
            <IonButton
              onClick={goToResturant}
              className={styles.welcomeBtn}
              size="large"
            >
              BERLIN
            </IonButton>
          </div>
        </div>
        <div className={`${styles.block} ${styles.block1}`}>
          <div className={styles.blockContent}>
            <h1>Factory Girl</h1>
            <IonButton
              className={styles.welcomeBtn}
              onClick={goToResturant}
              size="large"
            >
              AMSTERDAM
            </IonButton>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default WelcomePage;
