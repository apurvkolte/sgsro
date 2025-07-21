import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import { getDiscountUI } from '../../redux/actions/productActions';
import { Buffer } from 'buffer';

const FeaturedSlider = ({ productsTop }) => {
    // State to control Swiper initialization
    const [isSwiperReady, setIsSwiperReady] = useState(false);

    const displayedProducts = useMemo(() => productsTop, [productsTop]);

    useEffect(() => {
        // Only set Swiper as ready if there are products to display
        if (displayedProducts && displayedProducts.length > 0) {
            setIsSwiperReady(true);
        }
    }, [displayedProducts]);

    return (
        isSwiperReady ? (
            <Swiper
                modules={[EffectCoverflow, A11y, Autoplay]}
                loop={true}
                speed={400}
                spaceBetween={60}
                slidesPerView="auto"
                pagination={{ clickable: true }}
                effect="coverflow"
                centeredSlides={true}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 80,
                    modifier: 2,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 100,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 150,
                    },
                }}
                className="featured_swiper"
            >
                {displayedProducts.map((product) => {
                    const { id, name, sale_price, discount, image } = product;
                    const newPrice = displayMoney(sale_price);
                    const oldPrice = displayMoney(Math.round(getDiscountUI(sale_price, discount)));
                    const EID = Buffer.from(`${id}`, 'binary').toString('base64');

                    return (
                        <SwiperSlide key={id} className="featured_slides">
                            <p className='products_name_slider'>{name}</p>
                            <figure className="featured_img rounded mx-auto d-block">
                                <Link href={`/product-details/${EID}?${encodeURIComponent(name)}`}>
                                    <img src={`/uploads/product/${image}`} loading="lazy" alt="best water purifier in Pune" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        ) : null
    );
};

export default FeaturedSlider;
