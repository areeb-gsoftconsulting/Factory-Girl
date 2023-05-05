import { IonButton, IonImg, IonLabel, IonList } from "@ionic/react";
import CartCard from "../CartCard";
import { IonIcon } from "@ionic/react";
import { cart } from "ionicons/icons";

import { trashBin } from "ionicons/icons";
import styles from "./cart.module.css";
import { useContext, useEffect, useState } from "react";
const RubberBand = require("react-reveal/RubberBand");

const Cart = () => {
  let [showAnimation, setShowAnimation] = useState(false);
  let userArrays: any = [];
  let items = 0;
  let placeOrder = false;
  return (
    <div className={styles.mainOuterCard}>
      <div className={styles.mainCart}>
        <h1 className={styles.cartLabel}>Cart</h1>
        <IonIcon
          // onClick={() => addItem({ item: [] })}
          slot="start"
          icon={cart}
          className={styles.cartIcon}
        ></IonIcon>
        <p className={styles.badgeCount}>{"9"}</p>
      </div>

      <IonList className={styles.ListBg}>
        <div>
          {/* Map over the userArrays array */}
          {userArrays.map((userArray: any, index: any) => (
            <div key={index}>
              {/* Map over the current user's items array */}
              {userArray.map((item: any, index: any) => (
                <div key={index}>
                  {/* Render the current item's details */}
                  <RubberBand>
                    <CartCard
                      data={item}
                      name={item?.title}
                      image={item?.image}
                      price={0}
                      quantity={item?.quantity}
                      selectedAdone={item?.addons}
                      selectedFlavour={item?.flavour}
                      selectedSize={item?.size}
                      user={item.user}
                      serialNo={item.serialNo}
                    />
                  </RubberBand>
                </div>
              ))}
            </div>
          ))}
        </div>
      </IonList>
      {items > 1 ? null : (
        <div>
          {!placeOrder ? (
            <IonImg
              className={styles.cartImage}
              src={
                "https://www.pngall.com/wp-content/uploads/5/Empty-Red-Shopping-Cart-PNG-Free-Download.png"
              }
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Cart;
