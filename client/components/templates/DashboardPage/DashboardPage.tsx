import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BrandsSlider from "@/components/modules/DashboardPage/BrandsSlider";
import styles from "@/styles/dashboard/index.module.scss";
import { useStore } from "effector-react";
import { $mode } from "@/context/mode";
import { $shoppingCart } from "@/context/shopping-cart";
import { AnimatePresence, motion } from "framer-motion";
import { ITattooMachines } from "@/types/tattoomachines";
import { getBestsellersOrNewMachinesFx } from "@/app/api/tattooMachines";
import CartAlert from "@/components/modules/DashboardPage/CartAlert";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";

const DashboardPage = () => {
  const [newMachines, setNewMachines] = useState<ITattooMachines>({} as ITattooMachines);
  const [bestsellers, setBestsellers] = useState<ITattooMachines>(
    {} as ITattooMachines
  );
  const [spinner, setSpinner] = useState(false);
  const shoppingCart = useStore($shoppingCart);
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length);
  const mode = useStore($mode);
  const darkModeClass = mode === "dark" ? `${styles.dark_mode}` : "";

  useEffect(() => {
    loadTattooMachines();
  }, []);

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadTattooMachines = async () => {
    try {
      setSpinner(true);
      const bestsellers = await getBestsellersOrNewMachinesFx(
        "/tattoo-machines/bestsellers"
      );
      const newMachines = await getBestsellersOrNewMachinesFx("/tattoo-machines/new");

      setBestsellers(bestsellers);
      setNewMachines(newMachines);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          My TattooMachines SHOP
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хіти продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newMachines.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            Про компанію
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa deleniti doloremque enim labore, nesciunt reiciendis vel voluptas. Accusantium ad
            aliquid asperiores aspernatur consectetur cupiditate debitis dignissimos distinctio dolores eos error inventore iure, labore minus neque, nostrum
            omnis pariatur praesentium quam quidem quo ratione rem tempore tenetur, veritatis. Beatae cum debitis deleniti fugiat ipsam magnam omnis quaerat
            quam rerum sequi? A accusamus aliquam assumenda at autem beatae debitis dolores ea eligendi error exercitationem expedita fuga, laboriosam modi
            molestias natus necessitatibus nobis, numquam odio perspiciatis possimus recusandae reiciendis sapiente sequi ullam vel vitae! Est, illum mollitia.
            Dolores dolorum eaque in laborum modi nulla pariatur quaerat sit vel veritatis? Ad aliquam assumenda deserunt dolor ex fugiat, laboriosam magni
            minima modi mollitia perspiciatis provident quae quo quod vero. A accusantium adipisci alias at consequuntur, culpa cumque delectus dignissimos
            distinctio doloremque, dolores ducimus excepturi, inventore ipsa iusto magnam nam non officiis placeat quis sapiente similique sit sunt suscipit
            temporibus vel veniam!
            voluptates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
