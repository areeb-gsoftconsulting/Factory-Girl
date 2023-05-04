import { IonButton, IonImg, IonLabel, IonList } from "@ionic/react";
import CartCard from "../CartCard";
import { IonIcon } from "@ionic/react";
import { cart } from "ionicons/icons";

import { trashBin } from "ionicons/icons";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
const RubberBand = require("react-reveal/RubberBand");

const Cart = () => {
  let [showAnimation, setShowAnimation] = useState(false);
  let userArrays: any = [];
  let items = 0;
  let placeOrder = false;
  return (
    <div className="mainOuterCard">
      <div className="mainCart">
        <h1 className="cartLabel">Cart</h1>
        <IonIcon
          // onClick={() => addItem({ item: [] })}
          slot="start"
          icon={cart}
          className="cartIcon"
        ></IonIcon>
        <p className="badgeCount">{"9"}</p>
      </div>

      <IonList className="ListBg">
        <div>
          {/* Map over the userArrays array */}
          {userArrays.map((userArray: any, index) => (
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
              className="cartImage"
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
