import { IonGrid, IonRow, IonSpinner, IonText } from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../Card";
import CategoryCard from "../categoryCard";
import styles from "./categoryContainer.module.css";
import { IonIcon } from "@ionic/react";
import { arrowBack, chevronForward } from "ionicons/icons";
import { IonBreadcrumb, IonBreadcrumbs } from "@ionic/react";
import CardsContainer from "../Card/CardsContainer";

const CategoryContainer = () => {
  const myDivRef: any = useRef(null);
  let isFirstRender: any = false;
  let loading = false;
  let selectedRoute = "Men999u";
  let category = [
    {
      _id: "63ee1255198bd2d74a9320c6",
      name: "FOOD",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:24:05.462Z",
      updatedAt: "2023-03-16T10:18:25.122Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678961904879.png",
    },
    {
      _id: "63ee1274198bd2d74a9320ca",
      name: "COFFEE",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:24:36.947Z",
      updatedAt: "2023-03-16T10:21:50.560Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962110295.jpeg",
    },
    {
      _id: "63ee12c2198bd2d74a9320ce",
      name: "SOFT DRINKS & COCKTAILS & BEER",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:25:54.603Z",
      updatedAt: "2023-03-16T10:26:51.676Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962411452.jpeg",
    },
    {
      _id: "63ee12cf198bd2d74a9320d2",
      name: "WINE",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:26:07.957Z",
      updatedAt: "2023-03-16T10:24:42.995Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962282736.jpeg",
    },
    {
      _id: "63ee12d5198bd2d74a9320d6",
      name: "TEA",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:26:13.553Z",
      updatedAt: "2023-03-16T10:26:02.117Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962361893.jpeg",
    },
    {
      _id: "63ee15c6f51170c1ab117239",
      name: "START UP FOOD FOR THE HUNGRY FELLOWS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:38:46.579Z",
      updatedAt: "2023-03-16T10:54:07.331Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678964047098.jpeg",
    },
    {
      _id: "63ee1678f51170c1ab11723d",
      name: "COCO ANJELA",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:41:44.100Z",
      updatedAt: "2023-03-16T10:52:07.210Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963926985.jpeg",
    },
    {
      _id: "63ee1696f51170c1ab117241",
      name: "BREAKFAST AND LUNCH FOR VEGETARIANS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:42:14.138Z",
      updatedAt: "2023-03-16T10:50:58.602Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963858377.webp",
    },
    {
      _id: "63ee16bef51170c1ab117245",
      name: "BREAKFAST AND LUNCH FOR VEGANS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:42:54.890Z",
      updatedAt: "2023-03-16T10:49:24.080Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963763861.jpeg",
    },
    {
      _id: "63ee16e8f51170c1ab117249",
      name: "VEGAN SIDE & EXTRAS & DIPPINGS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:43:36.413Z",
      updatedAt: "2023-03-16T10:48:32.464Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963712244.jpeg",
    },
    {
      _id: "63ee1701f51170c1ab11724d",
      name: "FG SWEET THINGS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:44:01.830Z",
      updatedAt: "2023-03-16T10:47:25.980Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963645741.jpeg",
    },
    {
      _id: "63ee171af51170c1ab117251",
      name: "ALLERGENS",
      parent: "63ee1255198bd2d74a9320c6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:44:26.748Z",
      updatedAt: "2023-03-16T10:46:38.703Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963598481.webp",
    },
    {
      _id: "63ee18fdf51170c1ab117256",
      name: "INFORMATION OF FACTORY GIRL'S BIO SPECIALITY COFFEE",
      parent: "63ee1274198bd2d74a9320ca",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:52:29.086Z",
      updatedAt: "2023-03-16T10:43:31.422Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963411195.jpeg",
    },
    {
      _id: "63ee1916f51170c1ab11725a",
      name: "HOT & COLD",
      parent: "63ee1274198bd2d74a9320ca",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T11:52:54.210Z",
      updatedAt: "2023-03-16T10:44:40.842Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963480617.jpeg",
    },
    {
      _id: "63ee1b9ef51170c1ab117263",
      name: "FRESH JUICE",
      parent: "63ee12c2198bd2d74a9320ce",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:03:42.122Z",
      updatedAt: "2023-03-16T10:39:28.309Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963168085.jpeg",
    },
    {
      _id: "63ee1baff51170c1ab117267",
      name: "SOFT COLD DRINKS",
      parent: "63ee12c2198bd2d74a9320ce",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:03:59.885Z",
      updatedAt: "2023-03-16T10:40:32.276Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963232053.jpeg",
    },
    {
      _id: "63ee1bc2f51170c1ab11726b",
      name: "COCKTAILS",
      parent: "63ee12c2198bd2d74a9320ce",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:04:18.906Z",
      updatedAt: "2023-03-16T10:41:24.664Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963284440.webp",
    },
    {
      _id: "63ee1bfbf51170c1ab11726f",
      name: "HOUSE",
      parent: "63ee12cf198bd2d74a9320d2",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:05:15.044Z",
      updatedAt: "2023-03-16T10:33:03.392Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962783168.webp",
    },
    {
      _id: "63ee1c0ef51170c1ab117273",
      name: "WHITE WINE",
      parent: "63ee12cf198bd2d74a9320d2",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:05:34.054Z",
      updatedAt: "2023-03-16T10:34:12.924Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962852699.jpeg",
    },
    {
      _id: "63ee1c80f51170c1ab117277",
      name: "RED WINE",
      parent: "63ee12cf198bd2d74a9320d2",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:07:28.367Z",
      updatedAt: "2023-03-16T10:35:05.354Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962905129.png",
    },
    {
      _id: "63ee1c9cf51170c1ab11727b",
      name: "ROSE",
      parent: "63ee12cf198bd2d74a9320d2",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:07:56.772Z",
      updatedAt: "2023-03-16T10:35:55.608Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962955344.webp",
    },
    {
      _id: "63ee1caaf51170c1ab11727f",
      name: "PROSECCO",
      parent: "63ee12cf198bd2d74a9320d2",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:08:10.518Z",
      updatedAt: "2023-03-16T10:36:48.569Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678963008346.png",
    },
    {
      _id: "63ee1cfdf51170c1ab117284",
      name: "ALTHAUS TEA",
      parent: "63ee12d5198bd2d74a9320d6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:09:33.537Z",
      updatedAt: "2023-03-16T10:29:58.669Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962598436.jpeg",
    },
    {
      _id: "63ee1d0cf51170c1ab117288",
      name: "FRESH TEA",
      parent: "63ee12d5198bd2d74a9320d6",
      restaurant: "63ee11e9198bd2d74a9320bd",
      createdAt: "2023-02-16T12:09:48.054Z",
      updatedAt: "2023-03-16T10:30:51.233Z",
      __v: 0,
      image: "uploads/menu/images/categoryImage-1678962650966.jpeg",
    },
  ];

  const [subCategories, setSubCAtegories] = useState<any>([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<any>();
  const [parent, setParent] = useState("");
  const [child, setChild] = useState("");

  const handleScroll = (scrollOffset: any) => {
    myDivRef.current.scrollBy({
      top: scrollOffset,
      behavior: "smooth",
    });
  };

  let [breadCrumbs, setBreadCrumbs] = useState(["Main Categories"]);

  return (
    <div className={styles.categoryContainer}>
      <div>
        <div className={styles.categoryContainerInnerDiv}>
          <div className={styles.navContainer}>
            <div className={styles.breadCrmContainer}>
              <IonBreadcrumbs>
                {breadCrumbs.map((obj, i) => {
                  return (
                    <IonBreadcrumb
                      color="light"
                      // onClick={() => {
                      //   if (obj === "Main Categories") {
                      //     setSelectedRoute({ item: "MainCategories" });
                      //   } else if (i !== 2) {
                      //     setSelectedRoute({ item: "SubCategories" });
                      //   }
                      // }}
                      key={i}
                    >
                      <p className={styles.breadcrm}>{obj}</p>

                      <IonIcon
                        slot="separator"
                        icon={chevronForward}
                        color="white"
                        size="small"
                      ></IonIcon>
                    </IonBreadcrumb>
                  );
                })}
              </IonBreadcrumbs>
            </div>
          </div>
          {isFirstRender ? (
            <div>
              <h6 className={styles.selectOrder}>Select Order</h6>
            </div>
          ) : (
            <div className={styles.navContainerMobile}>
              <IonIcon
                // onClick={handleBack}
                className={styles.backIcon}
                icon={arrowBack}
              />
              <h6
                style={{ paddingLeft: "10px" }}
                className={styles.mobileCategory}
              >
                "Main Category"
              </h6>
            </div>
          )}
          <IonGrid>
            <IonRow
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "0 auto",
              }}
            ></IonRow>
            <IonRow ref={myDivRef} className={styles.categoryCardContainer}>
              {loading && (
                <div className={styles.spinnerclass}>
                  <IonSpinner name="circles"></IonSpinner>
                </div>
              )}
              {selectedRoute === "Menu" ? (
                <CardsContainer />
              ) : (
                <CategoryCard
                  categoryData={category}
                  setSelectedSubCategoryId={setSelectedSubCategoryId}
                  selectedRoute={selectedRoute}
                  setChild={setChild}
                  setParent={setParent}
                />
              )}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </div>
  );
};

export default CategoryContainer;
