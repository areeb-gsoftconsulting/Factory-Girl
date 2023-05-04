import { useContext } from "react";
import { IonCardContent, IonLabel } from "@ionic/react";
import "./style.css";
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
  let tempPrice = selectedSize?.price ? parseFloat(selectedSize?.price) : 0;
  let tempAdone = selectedAdone[0]?.price
    ? parseFloat(selectedAdone[0]?.price)
    : 0;
  let totalprice = tempPrice + tempAdone;
  return (
    <IonCardContent className="cartCard">
      <img
        src={
          image
            ? `https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg`
            : noImage
        }
        className="cartImg"
      />
      <div className="cardContent">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p className="user">{user}</p>
          <p className="user">Item: {serialNo}</p>
        </div>
        <IonLabel className="cartItemName">{name}</IonLabel>
        <p className="extras">
          {selectedSize?.description} {selectedAdone[0]?.name}
        </p>
        <div className="cartBottom">
          <p className="price">${totalprice}</p>
          <div className="cartCardBtn">
            <button
              className="btn"
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
              className="btn"
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
