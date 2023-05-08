import { IonIcon } from "@ionic/react";
import { IonImg } from "@ionic/react";
import logo from "../../assets/images/logo.png";
import FG from "../../assets/images/FG.png";
import styles from "./header.module.css";
import { cart } from "ionicons/icons";
const Header: React.FC = () => {
  return (
    <div className={styles.mainHeader}>
      <img
        id="opening-modal"
        className={styles.ResturantLogo}
        src={logo}
        alt="The Wisconsin State Capitol building in Madison, WI at night"
      />
      <h3 className={styles.mainHeading}>Factory Girl</h3>

      <div className={styles.cartIcon}>
        <img
          id="opening-modal"
          className={styles.ResturantLogoFG}
          src={FG}
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        />
        <IonIcon className={styles.cartIconStyle} icon={cart} />
        <p className={styles.cartIconStyleBadge}>5</p>
      </div>
    </div>
  );
};

export default Header;
