import { IonButton, IonImg, IonLabel, IonList } from "@ionic/react";
import CartCard from "../CartCard";
import { IonIcon } from "@ionic/react";
import { cart } from "ionicons/icons";

import { trashBin } from "ionicons/icons";
import styles from "./cart.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cartContext";
const RubberBand = require("react-reveal/RubberBand");

const Cart = () => {
  let [showAnimation, setShowAnimation] = useState(false);
  const { items } = useContext(CartContext);
  let userArrays: any = [];
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
        <p className={styles.badgeCount}>{items?.length}</p>
      </div>

      <IonList className={styles.ListBg}>
        <div>
          {/* Map over the userArrays array */}
          {items.map((item: any, index: any) => {
            console.log("nananan", item, item.itemName);
            return (
              <RubberBand>
                <CartCard
                  data={item}
                  name={item?.itemName}
                  image={item?.image}
                  price={0}
                  quantity={item?.quantity}
                  selectedAdone={item?.extras}
                  selectedFlavour={item?.flavour}
                  selectedSize={item?.size}
                  user={item?.user}
                  serialNo={item?.serialNo}
                />
              </RubberBand>
            );
          })}
        </div>
      </IonList>
      {items.length > 1 ? null : (
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
