import React, { useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, A11y, Autoplay, Navigation } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import { Buffer } from 'buffer';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

SwiperCore.use([Pagination, A11y, Autoplay, Navigation]);

const HeroSlider = ({ products }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, []);

    const displayedProducts = useMemo(() => products.slice(0, 6), [products]);

    const taglines = [
        "Drink Pure Live Pure",
        "Flowing purity for your family",
        "Choose Quality in Purity in Every Drop",
        "Purifying Agent",
        "Perfect Quality For perfect Living",
        "Building the Healthy Community"
    ];

    return (
        <Swiper
            ref={swiperRef}
            modules={[Pagination, A11y, Autoplay, Navigation]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3300,
                disableOnInteraction: false,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
        >
            {displayedProducts.map((item, i) => {
                const { id, name, sale_price, original_price, image } = item;
                const EID = Buffer.from(`${id}`, 'binary').toString('base64');

                const newPrice = displayMoney(sale_price);
                const oldPrice = displayMoney(original_price);

                return (
                    <SwiperSlide
                        key={id}
                        className={`wrapper hero_wrapper hero_slide-${i}`}
                    >
                        <div className="hero_item_txt">
                            <h3>{name}</h3>
                            <h1>{taglines[i % taglines.length]}</h1>
                            <h2 className="hero_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                            <Link href={`/product-details/${EID}?${encodeURIComponent(name)}`} passHref>
                                <a className="btn btn-success">Shop Now</a>
                            </Link>
                        </div>
                        <figure className="hero_item_img">
                            <img src={`/uploads/product/${image}`} loading="lazy" alt="product-img" />
                        </figure>
                    </SwiperSlide>
                );
            })}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </Swiper>
    );
};

export default HeroSlider;
