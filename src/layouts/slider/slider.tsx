import {Box, Button} from '@mui/material'
import Carousel from 'react-elastic-carousel'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import clsx from 'clsx'
import SliderStyles from '../../assets/makeStyles/slider/sliderStyles'
import CardPage from '../card'
import {ISlider} from '../../shared/types/slider/slider'

const Slider = ({carouselItems, sizeItems}: ISlider) => {
  const classes = SliderStyles()
  const arrowType = 'PREV'

  const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2, itemsToScroll: 2},
    {width: 768, itemsToShow: 3},
    {width: 1200, itemsToShow: 5},
    {width: 1600, itemsToShow: 7},
    {width: 2000, itemsToShow: 9},
  ]

  const carouselArrow = ({
    type,
    onClick,
    isEdge,
  }: {
    type: string
    onClick: (text: object) => void
    isEdge: boolean
  }) => {
    const pointer =
      type === arrowType ? (
        !isEdge && (
          <Box className="arrow-left-icon">
            <ArrowRightAltIcon />
          </Box>
        )
      ) : (
        <ArrowRightAltIcon />
      )
    return (
      <Button
        className={`${
          type === 'PREV'
            ? clsx(
                classes.buttonLeft,
                sizeItems === 'normal' ? classes.buttonNormal : classes.buttonBig,
              )
            : clsx(
                classes.buttonRight,
                sizeItems === 'normal' ? classes.buttonNormal : classes.buttonBig,
              )
        }`}
        onClick={onClick}
        disabled={isEdge}
      >
        {pointer}
      </Button>
    )
  }

  return (
    <Box className="my-own-custom-container">
      <Box className={`${classes.SliderContainer} carousel-wrapper`}>
        <Carousel
          renderArrow={carouselArrow}
          pagination={false}
          isRTL={false}
          breakPoints={breakPoints}
          className={`${sizeItems === 'big' && classes.sliderItemsSize288}`}
        >
          {
            // children
            // ? carouselItems.map((item) => (
            //     <Box component="div" key={item.id}>
            //       {children}
            //     </Box>
            //   ))
            // :
            carouselItems &&
              carouselItems.eventPairModelOut.map(
                (item, index) =>
                  item && (
                    <Box component="div" key={index}>
                      <CardPage
                        id={carouselItems.id}
                        status={item.status}
                        data={item}
                        carouselItems={carouselItems}
                      />
                    </Box>
                  ),
              )
          }
        </Carousel>
      </Box>
    </Box>
  )
}
export default Slider
