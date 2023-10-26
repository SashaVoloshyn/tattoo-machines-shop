/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/machine/index.module.scss'
import { $tattooMachine } from "@/context/tattooMachine";
import MachineImagesItem from "@/components/modules/MachinePage/MachineImagesItem";
import MachineSlider from "@/components/modules/MachinePage/MachineSlider";

const MachineImagesList = () => {
  const tattooMachine = useStore($tattooMachine)
  const isMobile = useMediaQuery(850)
  const images = tattooMachine.images
    ? (JSON.parse(tattooMachine.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <MachineSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={tattooMachine.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <MachineImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MachineImagesList
