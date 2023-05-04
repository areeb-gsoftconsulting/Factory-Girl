import { IonCol, IonAlert } from "@ionic/react";
import styles from "./categoryCard.module.css";
import { useContext, useEffect, useState } from "react";
import background from "../../assets/images/categoryImg.png";
import newOrderIcon from "../../assets/images/newOrder.png";
import joinOrderIcon from "../../assets/images/joinOrder.png";

const CategoryCard = ({
  categoryData,
  setSelectedSubCategoryId,
  setChild,
  setParent,

  alanBtnInstance,
  nameModal,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [cartNo, setCartNo] = useState(0);
  let isFirstRender: any = false;
  let [actionArray, setSection] = useState([
    { name: "New Order", img: newOrderIcon, value: "New" },
    { name: "Join Order", img: joinOrderIcon, value: "Existing" },
  ]);

  const cartDecesion = (data: any) => {
    if (data.value == "New") {
      // setUserName("owner");
      // setFirstRender(false);
    }
    if (data.value !== "New") {
      handleAlert();
    }
  };

  const handleAlert = () => {
    setShowAlert(true);
  };

  if (isFirstRender === false) {
    return categoryData.map((data: any, ind: any) => {
      const gradient = {
        backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8)), url(${
          data?.image
            ? `${"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"}`
            : `${background}`
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        width: "100%",
        height: "170px",
      };
      return (
        <IonCol
          // onClick={() => handleClick(data)}
          size="12"
          size-lg="4"
          size-md="6"
          size-sm="6"
        >
          <div
            key={ind}
            className={styles.categoryCard}
            style={{
              ...gradient,
            }}
          >
            <h4>{data.name}</h4>
          </div>
        </IonCol>
      );
    });
  } else {
    return actionArray.map((data: any, ind: any) => {
      return (
        <IonCol
          onClick={() => cartDecesion(data)}
          size="12"
          size-lg="6"
          size-md="6"
          size-sm="6"
        >
          <div key={ind} className={styles.welcomeCard}>
            <h4>{data.name}</h4>
            <img src={data.img} className={styles.welcomIcon} />
          </div>

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Enter Details"
            inputs={[
              {
                name: "input2",
                type: "number",
                placeholder: "Enter order number",
                // value: cartNumber,
              },
            ]}
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                handler: () => setShowAlert(false),
              },
              {
                text: "OK",
                // handler: (inputValues) => handleAlertConfirm(inputValues),
              },
            ]}
          />

          {/* asking user name */}
          <IonAlert
            isOpen={showNameAlert}
            onDidDismiss={() => setShowNameAlert(false)}
            header="Enter Your Name"
            inputs={[
              {
                name: "name",
                placeholder: "Enter you Name",
              },
            ]}
            buttons={[
              {
                text: "Skip",
                role: "OK",
                // handler: (inputValues) => handleAlertConfirmName(inputValues),
              },
              {
                text: "OK",
                // handler: (inputValues) => handleAlertConfirmName(inputValues),
              },
            ]}
          />
        </IonCol>
      );
    });
  }
};

export default CategoryCard;
