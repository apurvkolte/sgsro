import React, { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSiderImage } from "../../redux/actions/productActions";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const MainSlider = () => {
    const dispatch = useDispatch();
    const { siderImages } = useSelector((state) => state.allSiderImage);

    useEffect(() => {
        dispatch(getSiderImage())
    }, [dispatch])

    const validImages = siderImages.filter(item => item.url);

    return (
        <div className='mobileImage'>
            {siderImages &&
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={6000}
                    centerMode={false}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass="custom-dot-list"
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1
                        }
                    }
                    }
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {validImages.map((item) => (
                        <div
                            key={item.id}
                            className='bg-image'
                            style={{
                                backgroundImage: `url("${item.url}")`,
                            }}
                        />
                    ))}
                </Carousel >
            }
        </div>
    )
}

export default MainSlider