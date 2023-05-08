import { useContext } from "react";
import { IonCardContent, IonLabel } from "@ionic/react";
import styles from "./cartCard.module.css";
import noImage from "../../assets/images/noimage.jpeg";

function CartCard({
  data,
  name,
  price,
  image,
  quantity,
  selectedAdone,
  selectedSize,
  selectedFlavour,
  user,
  serialNo,
}: any) {
  // let tempPrice = selectedSize?.price ? parseFloat(selectedSize?.price) : 0;
  // let tempAdone = selectedAdone[0]?.price
  //   ? parseFloat(selectedAdone[0]?.price)
  //   : 0;
  // let totalprice = tempPrice + tempAdone;
  console.log("namename", name);
  return (
    <IonCardContent className={styles.cartCard}>
      <img
        src={
          image
            ? `https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg`
            : noImage
        }
        className={styles.cartImg}
      />
      <div className={styles.cardContent}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className={styles.user}>Allen</p>
          {/* <p className={styles.user}>Item: {serialNo}</p> */}
        </div>
        <IonLabel className={styles.cartItemName}>{name}</IonLabel>
        <p className={styles.extras}>
          {selectedSize} {selectedAdone}
        </p>
        <div className={styles.cartBottom}>
          <p className={styles.price}>${"120"}</p>
          <div className={styles.cartCardBtn}>
            <button
              className={styles.btn}
              // onClick={() =>
              //   setUpdateItem({
              //     data: data?.title,
              //     quantity: 1,
              //     itemData: data,
              //     itemNum: data.serialNo,
              //   })
              // }
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              className={styles.btn}
              // onClick={() => increaseQuantity({ item: data })}
            >
              +
            </button>
          </div>
        </div>

        {/* <p>Flavour: {selectedFlavour?.name}</p> */}
      </div>
    </IonCardContent>
  );
}
export default CartCard;
