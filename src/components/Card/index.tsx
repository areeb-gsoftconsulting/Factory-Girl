import { IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import styles from "./cardContainer.module.css";
import addBtn from "../../assets/images/addBtn.png";
import addBtnDisable from "../../assets/images/addBtnDisable.png";
import animationData from "../../animation/ButtonAnimation.json";
import Lottie from "react-lottie";

const Card = ({ data, gradient }: any) => {
  let [getAddon, setAddon] = useState<any>([]);
  let [getFlavour, setFlavour] = useState<any>([]);
  const [animation, setAnimation] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log({ animation });

  useEffect(() => {
    if (animation) {
      setTimeout(() => setAnimation(false), 2000);
    }
  }, [animation]);

  function addItemToCart(
    cart: any,
    items: any,
    itemName: any,
    selectedAddons: any,
    selectedFlavor: any,
    selectedSize: any,
    quantity: any
  ) {
    let tempCart = cart;
    // Search for an existing item in the cart that matches the selected addons, flavor, and size

    // const existingItem = undefined;
    const existingItem = cart.find((item: any) => {
      return (
        item.title === itemName &&
        item.size?.description?.toLowerCase() === getFlavour[0]?.description &&
        getAddon?.name?.toLowerCase() === item.addons[0]?.name?.toLowerCase()
      );
    });

    // If an existing item was found, increment its quantity
    if (existingItem) {
      setAnimation(true);

      existingItem.quantity += quantity;
      // addItem({
      //   item: cart,
      // });
      setAddon("");
      setFlavour([]);
    } else {
      // Search for the item in the list of all items
      const selectedItem = items.find(
        (item: any) => item?.title?.toLowerCase() === itemName?.toLowerCase()
      );

      if (selectedItem) {
        // Find the selected size object
        const selectedSizeObject = selectedItem.price[0]?.description
          ? getFlavour[0]
          : selectedItem.price[0];
        setAnimation(true);
        // Add the new item to the cart
        // setItemNum(itemNum + 1);
        tempCart.push({
          title: itemName,
          addons: getAddon === "" ? [] : getAddon,
          flavour: [],
          size: selectedSizeObject,
          quantity: quantity,
          image: selectedItem?.image,
          // user: username ? username : "owner",
          // serialNo: itemNum + 1,
        });
        // addItem({
        //   item: tempCart,
        // });

        setAddon([]);
        setFlavour([]);
      }
    }
  }

  return (
    <div className={data.inStock ? styles.cards : styles.cardsDisable}>
      <div
        // onClick={() => setShowItem([data?.title])}
        className={styles.cartDesign}
        style={{
          ...gradient,
        }}
      >
        <div className={styles.cardHeader}>
          <h1></h1>
          {/* <h6 className="cardCategory">Food</h6> */}
          <h6
            className={
              data.inStock ? styles.cardStockAvailable : styles.cardStock
            }
          >
            {data.inStock ? "Available" : "Unavailable"}
          </h6>
        </div>
        <div>
          <h6 className={styles.cardPrice}>
            {/* {resturant?.currencySymbol} */}${data.price[0].price}
          </h6>
        </div>
      </div>
      {animation ? (
        <div className={styles.addBtn}>
          <Lottie options={defaultOptions} height={30} width={30} />
        </div>
      ) : (
        <img
          // onClick={() =>
          //   !data.inStock
          //     ? console.log("")
          //     : data.addOns.length === 0 &&
          //       data.price[0]?.description === undefined
          //     ? addItemToCart(items, allMenuItems, data.title, [], [], [], 1)
          //     : setShowItem([data?.title])
          // }
          className={styles.addBtnImage}
          src={data.inStock ? addBtn : addBtnDisable}
        />
      )}
      <h6 className={styles.itemTitle}>{data?.title}</h6>
    </div>
  );
};

export default Card;
