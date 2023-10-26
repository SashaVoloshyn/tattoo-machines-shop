/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/machine/index.module.scss'
import { IMachineImagesItemProps } from "@/types/machine";

const MachineImagesItem = ({ src, callback, alt }: IMachineImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt} />
    </li>
  )
}

export default MachineImagesItem
