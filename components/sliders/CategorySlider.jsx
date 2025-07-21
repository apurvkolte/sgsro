import React, { Fragment, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allCategory } from '../../redux/actions/productActions';
import filtersContext from '../../contexts/filters/filtersContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';

const CategorySlider = () => {
    const dispatch = useDispatch();
    const { category } = useSelector(state => state.allCategory);
    const { categoryMenu } = useContext(filtersContext);

    useEffect(() => {
        dispatch(allCategory());
    }, [dispatch]);

    return (
        <Fragment>
            {category && (
                <Carousel
                    additionalTransfrom={0}
                    arrows={true}
                    autoPlay={false}
                    // autoPlaySpeed={3000}
                    centerMode={false}
                    className="center d-inline-flex p-4 "
                    containerClass="container-with-dots"
                    dotListClass=""
                    // draggable
                    focusOnSelect={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    spacing={120}
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
                            items: 5,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 0
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 0
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    ssr={true}
                    // shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                // swipeable
                >
                    {category.map((cat) => (
                        <div className='py-4' key={cat.id}>
                            <Link href={`/all-products?product=${encodeURIComponent(cat.category)}`}>
                                <a onClick={() => categoryMenu(cat.category)} style={{ textAlign: 'center', display: 'block' }}>
                                    <img
                                        src={`/uploads/category/${cat.img}`}
                                        alt='best water purifier in Pune'
                                        style={{
                                            display: 'block',
                                            height: '120px',
                                            width: '120px',
                                            margin: '0 auto',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #eaeaea',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: '#fff',
                                            padding: '4px',
                                            boxSizing: 'border-box'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <p className="water-category-name" style={{
                                        margin: '10px auto 0',
                                        width: '100px',
                                    }}>
                                        {cat.category}
                                    </p>
                                </a>
                            </Link>
                        </div>
                    ))}
                </Carousel>
            )}
        </Fragment>
    );
}

export default CategorySlider;
