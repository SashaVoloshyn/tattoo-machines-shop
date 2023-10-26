/* eslint-disable @next/next/no-img-element */
import { useStore } from "effector-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { $mode } from "@/context/mode";
import styles from "@/styles/machine/index.module.scss";
import { $tattooMachine } from "@/context/tattooMachine";

const MachineTabs = () => {
  const mode = useStore($mode);
  const tattooMachine = useStore($tattooMachine);
  const darkModeClass = mode === "dark" ? `${styles.dark_mode}` : "";
  const [showDescription, setShowDescription] = useState(true);
  const [showCompatibility, setShowCompatibility] = useState(false);

  const handleShowDescription = () => {
    setShowDescription(true);
    setShowCompatibility(false);
  };

  const handleShowCompatibility = () => {
    setShowDescription(false);
    setShowCompatibility(true);
  };

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ""}
          onClick={handleShowDescription}
        >
          Опис товару
        </button>
        <button
          className={showCompatibility ? styles.active : ""}
          onClick={handleShowCompatibility}
        >
          Характеристики
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3
            className={`${styles.part__tabs__content__title} ${darkModeClass}`}
          >
            {tattooMachine.name}
          </h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            {tattooMachine.description}
          </p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Виробник : <b>{tattooMachine.machine_manufacturer}.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Країна виготовлення : <b>{tattooMachine.country_manufacturer}.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Матеріал : <b>{tattooMachine.material}.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Колір : <b>{tattooMachine.color}.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Вага : <b>{tattooMachine.weight} грамм.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Хіт голки : <b>{tattooMachine.needle_stroke}мм.</b>
          </p>

          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
            Тип :<b> {tattooMachine.type}</b>.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MachineTabs;
