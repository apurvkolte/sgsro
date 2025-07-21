import React, { Fragment, memo, useEffect, Suspense, useState } from 'react';
import Link from "next/link";
import Seo from "../../components/common/seo";
import { useRouter } from "next/router";
import { IoMdStar, IoMdCheckmark, IoMdCloseCircle, IoMdChatbubbles, IoIosCart } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../../helpers/utils';
import useDocTitle from '../../hooks/useDocTitle';
import useActive from '../../hooks/useActive';
import SectionsHead from '../../components/common/SectionsHead';
import Services from '../../components/common/Services';
import { getAllUserCoupons } from '../../redux/actions/orderActions'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getProductDetails, newReview, getProductReviews1, getDiscountUI } from "../../redux/actions/productActions";
import { newEnquiry } from "../../redux/actions/userActions";
import { removeBuyItem, addItemToCart, addBuyItem } from "../../redux/actions/cartActions";
// import { myOrders } from '../../redux/actions/orderActions';
import { NEW_REVIEW_RESET } from "../../redux/constants/productConstants";
import ReadMore from "../../components/product/ReadMore ";
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductReviews from '../../components/product/ProductReviews';
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import 'react-toastify/dist/ReactToastify.css';
import { FaShareAlt, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
const LazyRelatedSlider = React.lazy(() => import('../../components/sliders/RelatedSlider'));


const index = () => {
    const router = useRouter()
    const id = router.query.id;
    const { data: session } = useSession();
    useDocTitle('Copper RO Water Purifier in Pune');

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [showAllReview, setShowAllReview] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const { loading, error, product, relatedProduct, productProperties } = useSelector((state) => state.productDetails);
    const selecproductReviews = state => state.productReviews;
    const { reviews } = useSelector(selecproductReviews, shallowEqual);
    const MemoizedRelatedSlider = memo(LazyRelatedSlider);
    const productImages = product?.images ? JSON.parse(product.images) : [];
    const productDetails = product?.specifications ? JSON.parse(product?.specifications) : [];

    const { cartItems } = useSelector(state => state.cart);
    const { coupons } = useSelector(state => state.allUserCoupons);
    const { error: reviewError, success } = useSelector((state) => state.newReview);
    // const { productsRelated } = useSelector((state) => state.productsRelated);
    const { buyItem } = useSelector(state => state.buy);
    // const { orders } = useSelector(state => state.myOrders);
    // const pCategory = product.category;
    // var purchased = false
    const [isVisible, setIsVisible] = useState(false);
    const currentUrl = window.location.href;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [user_id, setUser_id] = useState(0);
    const [user_name, setUser_name] = useState(0);
    const [productName, setProductName] = useState("");
    const [message, setMessage] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [previewImg, setPreviewImg] = useState(productImages);

    const EID = Buffer.from(`${product.id}`, 'binary').toString('base64')
    // setting the very-first image on re-render
    useEffect(() => {
        if (productImages.length) {
            setPreviewImg(productImages[0]);
        }
        handleActive(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!EID || EID !== id) {
            if (id) {
                dispatch(getProductDetails(id))
                dispatch(getProductReviews1(id))
            }
        }
        dispatch(getAllUserCoupons());

        // if (pCategory) {
        //     dispatch(getRelatedProducts(pCategory));
        // }
        if (error) {
            if (error === 'Product not found') {
                router.push('/404', { replace: true });
            } else {
                toast.error(error);
            }
        }
        if (reviewError) {
            toast.error(reviewError);
        }
        if (success) {
            toast.success("Review posted successfully");
            dispatch(getProductReviews1(id))
            dispatch({ type: NEW_REVIEW_RESET });
        }

        if (session?.user) {
            setUser_id(session.user.id)
            setName(session.user.name)
            setMobile(session.user.mobile)
            setUser_name(session.user.name)
            setEmail(session.user.email)
        }

        if (product) {
            setProductName(product?.name);
            setProductQuantity(quantity)
        }
        setComment("");
        setRating("");

        // const body = document.querySelector('#root');

        // body.scrollIntoView({
        //     behavior: 'smooth'
        // }, 500)
    }, [EID, error, id, reviewError, success, reviews]);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { handleActive, activeClass } = useActive(0);

    // For hiding table in product details
    const [r, setR] = useState('r');
    const hide = () => {
        if (r === "r") {
            setR("p");
        } else {
            setR("r");
        }
    }

    // Function to filter unique values
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    // Arrays to hold properties and values
    var arr = [];
    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arrID = [];

    // Loop through productProperties to populate arrays
    if (productProperties) {
        productProperties.forEach((item) => {
            arr.push(item.properties1, item.properties2, item.properties3);
            arr1.push(item.value1);
            arr2.push(item.value2);
            arr3.push(item.value3);
            arrID.push(item.id);
        });
    }

    const uniqueValues = [...new Set(arr)];


    //buy now buttion
    const addToBuy = () => {
        remove();
        dispatch(addBuyItem(id, quantity));
        // router.push('/shipping', { state: { prevPath: router.pathname } });
        router.push('/shipping');;
    }
    const enquiry = (id, productName, productQuantity) => {
        router.push('/shipping', { state: { id, productName, productQuantity } });;
    }

    const remove = () => {
        // localStorage.removeItem("buyItem");
        if (buyItem) {
            buyItem.map(item => (
                dispatch(removeBuyItem(item.product))))
        }
    }

    // function stockZero() {
    //     if (product.stock === 0) {
    //         toast.error("Currently product out of stock")
    //     }
    // }

    const increaseQty = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber >= 30) {
            toast.error("Maximum Orderable Quantity Should be 30")
        } else {
            if (count.valueAsNumber >= product.stock) {
                toast.error(`${product.name} available stock is ${product.stock}`);
                return;
            };
            const qty = count.valueAsNumber + 1;
            setQuantity(qty);

        }
    };

    const decreaseQty = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };
    // handling Add-to-cart
    const handleAddItem = () => {
        addToCart(EID);
    };

    const addToCart = (id) => {
        const BID = Buffer.from(`${id}`, 'base64').toString('binary');
        if (cartItems.length < 10) {
            let count = 0;

            const check = cartItems.filter((item) => item.product === Number(BID));
            if (check.length) {
                count = check[0].quantity;
                if (check[0].quantity + quantity > check[0].stock) {
                    return toast.error("This product is already in your cart");
                }
            }

            if (count) {
                toast.success("Item Added to Cart");
                dispatch(addItemToCart(id, (quantity + count)));
            } else {
                toast.success("Item Added to Cart");
                dispatch(addItemToCart(id, quantity));
            }

        } else {
            toast.success("Cart has touched the max limit. Please delete existing cart items to add a new item. ");
        }
    };

    //enquiry submit
    function submit(data, e) {
        handleClose();
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("mobile", mobile);
        formData.set("email", email);
        formData.set("message", message);
        formData.set("product_id", product.id);
        formData.set("productName", productName);
        formData.set("productQuantity", productQuantity);
        formData.set("user_id", user_id);
        formData.set("user_name", user_name);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = object

        dispatch(newEnquiry(json));
        reset();
        restefiled();
    }

    function restefiled() {
        toast.success("Request has been send successfully");
        setName("")
        setMobile()
        setEmail("")
        setMessage("")
    }


    // handling Preview image
    const handlePreviewImg = (i) => {
        setPreviewImg(productImages[i]);
        handleActive(i);
    };


    //review
    function setUserRatings() {
        const stars = document.querySelectorAll(".star");
        stars && stars.forEach((star, index) => {
            star.starValue = index + 1;

            ["click", "mouseover", "mouseout"].forEach(function (e) {
                star.addEventListener(e, showRatings);
            });
        });

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === "click") {
                    if (index < this.starValue) {
                        star.classList.add("orange");
                        setRating(this.starValue);
                    } else {
                        star.classList.remove("orange");
                    }
                }
                if (e.type === "mouseover") {
                    if (index < this.starValue) {
                        star.classList.add("yellow");
                    } else {
                        star.classList.remove("yellow");
                    }
                }
                if (e.type === "mouseout") {
                    star.classList.remove("yellow");
                }
            });
        }
    }
    const reviewHandler = () => {
        if (rating && comment.length !== 0) {
            const formData = new FormData();
            formData.set("rating", rating);
            formData.set("comment", comment);
            formData.set("productId", id);

            var object = {};
            formData.forEach((value, key) => object[key] = value);
            var json = object

            dispatch(newReview(json));
        } else {
            toast.error("Product Rating Stars & Comment Cannot Empty...!!!")
        }
    }


    function getUniqueValues(arr1, arr2, arr3, index) {
        switch (index) {
            case 0:
                return arr1.filter(onlyUnique);
            case 1:
                return arr2.filter(onlyUnique);
            case 2:
                return arr3.filter(onlyUnique);
            default:
                return [];
        }
    }


    // calculating Prices
    // const discountedPrice = originalPrice - finalPrice;
    // const newPrice = displayMoney(finalPrice);
    // const oldPrice = displayMoney(originalPrice);
    // const savedPrice = displayMoney(discountedPrice);
    // const savedDiscount = calculateDiscount(discountedPrice, originalPrice);
    const options = {
        arrowPrev: true,
        arrowNext: true,
        zoom: true,
        close: true,
        counter: true,
        // bgOpacity: 0.2,
        padding: { top: 20, bottom: 40, left: 100, right: 100 },
    }

    return (
        <Fragment>
            <Seo pageTitle={"Best Water Purifier " + `${product?.name}` + " Pune"} />
            <div className='pd'>
                {Object.keys(product).length !== 0 &&
                    <Fragment>
                        <section id="product_details" className="section">
                            <div className="container">

                                <div className="wrapper prod_details_wrapper">
                                    <div className="prod_details_left_col">

                                        <Gallery options={options}>
                                            <div className="prod_details_tabs">
                                                {
                                                    productImages.map((img, i) => (
                                                        <div
                                                            key={i}
                                                            className={`tabs_item mb-2 bg-white ${activeClass(i)}`}
                                                            onMouseOver={() => handlePreviewImg(i)}
                                                        >

                                                            <Item
                                                                original={`/uploads/product/${img}`}
                                                                thumbnail={`/uploads/product/${img}`}
                                                                width="1280" height="1280"
                                                            >
                                                                {({ ref, open }) => (
                                                                    <img ref={ref} onClick={open} src={`/uploads/product/${img}`} loading="lazy" alt={"best water purifier in pune " + product?.name} />
                                                                )}
                                                            </Item>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            <Item
                                                original={`/uploads/product/${previewImg}`}
                                                thumbnail={`/uploads/product/${previewImg}`}
                                                width="1280" height="1280"
                                            >

                                                {({ ref, open }) => (
                                                    <figure className="prod_details_img bg-white zoom" >
                                                        <img ref={ref} onClick={open} src={`/uploads/product/${previewImg}`} loading="lazy" alt={"best water purifier in pune " + product?.name} />
                                                    </figure>
                                                )}
                                            </Item>

                                        </Gallery>
                                    </div>

                                    {/*=== Product Details Right-content ===*/}
                                    <div className="prod_details_right_col p-3">
                                        <h1
                                            className="prod_details_title"
                                            style={{
                                                fontSize: '2.2rem',
                                                fontWeight: '700',
                                                marginBottom: '1.5rem',
                                                color: '#2c3e50',
                                                lineHeight: '1.3',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                letterSpacing: '0.5px'
                                            }}
                                        >
                                            {product.name}
                                        </h1>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <h4
                                                    className="prod_details_info"
                                                    style={{
                                                        color: '#3498db',
                                                        fontSize: '1.1rem',
                                                        fontWeight: '600',
                                                        marginBottom: '0.5rem',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        fontFamily: '"Segoe UI", Roboto, sans-serif'
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="me-2"
                                                        viewBox="0 0 16 16"
                                                        style={{ verticalAlign: 'text-top' }}
                                                    >
                                                        <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.844 3 8 3c-.844 0-2.254 1.176-3.568 2.638C3.122 7.096 2 8.345 2 10a6 6 0 0 0 6 6zm0-13c.753 0 1.92.713 2.665 1.79.694.995 1.335 2.21 1.335 3.21 0 .728-.26 1.448-.683 2h-6.64A3.5 3.5 0 0 1 4 10c0-1 .641-2.215 1.335-3.21C6.08 3.713 7.247 3 8 3z" />
                                                    </svg>
                                                    {product.category}
                                                </h4>
                                            </div>
                                            <div className="col-6 prod_details_ratings">
                                                <span className="rating_star">
                                                    {
                                                        [...Array(product.ratings)].map((_, i) => <IoMdStar key={i} />)
                                                    }
                                                </span>
                                                <span>|</span>
                                                <Link href="#"><>{product.numOfReviews} Ratings</></Link>
                                                <div className="share-button-container">
                                                    <button title='Share on' className="share-icon bg-light text-dark border" onClick={toggleVisibility}>
                                                        <FaShareAlt />
                                                    </button>
                                                    {isVisible && (
                                                        <div className="social-icons">
                                                            <a className="whatsapp" href={`https://api.whatsapp.com/send?text=Check%20this%20out:%20${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                                                                <FaWhatsapp />
                                                            </a>
                                                            <a className="facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                                                                <FaFacebookF />
                                                            </a>
                                                            <a className="linkedin" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer">
                                                                <FaLinkedinIn />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="separator"></div>
                                        <div className="prod_details_price">
                                            <div className="price_box">
                                                <h2 className="price text-success">
                                                    {displayMoney(product.sale_price)} &nbsp;
                                                    <small className="del_price"><del>{displayMoney(Math.round(getDiscountUI(product.sale_price, product.discount)))}</del></small>
                                                </h2>
                                                <p className="saved_price">You save: {displayMoney(Math.ceil(product.sale_price - getDiscountUI(product.sale_price, product.discount)))} ({product.discount}%)</p>
                                                <span className="tax_txt">(Inclusive of all taxes)</span><br />

                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <a href="#" onClick={handleShow}>
                                                    <div style={{
                                                        marginRight: '10px',
                                                        padding: '5px 10px',
                                                        backgroundColor: '#007bff',
                                                        color: 'white',
                                                        borderRadius: '5px',
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        cursor: 'pointer'
                                                    }}>
                                                        <IoMdChatbubbles style={{ marginRight: '5px' }} />Enquiry Now
                                                    </div>
                                                </a>

                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title><b>Bulk Order Enquiry Form</b></Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form onSubmit={handleSubmit(submit)}>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <label>Name :</label>
                                                                    <div className="form-group mb-3">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Your Name"
                                                                            required
                                                                            value={name}
                                                                            onChange={(e) => setName(e.target.value)}
                                                                            id="Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <label>Mobile No :</label>
                                                                    <div className="form-group mb-3">
                                                                        <input
                                                                            type="number"
                                                                            placeholder="Phone"
                                                                            required
                                                                            className={`form-control  ${errors.mobile && "invalid"}`}
                                                                            {...register("mobile", {
                                                                                pattern: {
                                                                                    value: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/g,
                                                                                    message: "Invalid Mobile Number",
                                                                                },
                                                                                maxLength: {
                                                                                    value: 15,
                                                                                    message: "Invalid Mobile Number",
                                                                                }
                                                                            })}
                                                                            onSubmit={() => {
                                                                                trigger("mobile");
                                                                            }}
                                                                            value={mobile}
                                                                            onChange={(e) => setMobile(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    {errors.mobile && (
                                                                        <small className="text-danger">{errors.mobile.message}</small>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col">
                                                                    <label>Email Address :</label>
                                                                    <div className="form-group mb-3">
                                                                        <input
                                                                            type="email"
                                                                            placeholder="Email"
                                                                            required
                                                                            className={`form-control  ${errors.email_field && "invalid"}`}
                                                                            {...register("email", {
                                                                                pattern: {
                                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                                    message: "Invalid Email ID",
                                                                                }
                                                                            })}
                                                                            onKeyUp={() => {
                                                                                trigger("email");
                                                                            }}
                                                                            value={email}
                                                                            onChange={(e) => setEmail(e.target.value)}
                                                                        />
                                                                    </div>
                                                                    {errors.email && (
                                                                        <small className="text-danger">{errors.email.message}</small>
                                                                    )}
                                                                </div>
                                                                <div className="col">
                                                                    <label>Product Quantity :</label>
                                                                    <div className="form-group mb-3">
                                                                        <input
                                                                            type="number"
                                                                            placeholder="Enter quantity"
                                                                            min={0}
                                                                            required
                                                                            className="form-control"
                                                                            value={productQuantity}
                                                                            onChange={(e) => setProductQuantity(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <label>Product Name :</label>
                                                            <div className="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Product Name"
                                                                    required
                                                                    value={productName}
                                                                    onChange={(e) => setProductName(e.target.value)} id="Name"
                                                                />
                                                            </div>

                                                            <label>Your Message :</label>
                                                            <div className="form-group mb-3">
                                                                <textarea
                                                                    id="form_message"
                                                                    name="form_message"
                                                                    rows="5"
                                                                    placeholder="Your Message"
                                                                    className="form-control "
                                                                    value={message}
                                                                    onChange={(e) => setMessage(e.target.value)}
                                                                ></textarea>
                                                            </div>

                                                            <Modal.Footer>
                                                                <span className="text-secondary fw-medium">
                                                                    Call our customer service at <a href="tel:+918007779657" className=" bg-light fw-bold">+91 800 777 9657</a>. We're here to help!
                                                                </span>
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button type="submit" variant="primary">
                                                                    Send
                                                                </Button>
                                                            </Modal.Footer>
                                                        </form>
                                                    </Modal.Body>
                                                </Modal>
                                                {product.stock === 0 ? (
                                                    <div style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: 'red',
                                                        color: 'white',
                                                        borderRadius: '5px',
                                                        fontSize: '14px',
                                                        lineHeight: '20px'
                                                    }}>
                                                        <span><IoMdCloseCircle /> Out Of Stock</span>
                                                    </div>
                                                ) : (
                                                    <div style={{
                                                        padding: '5px 10px',
                                                        backgroundColor: 'green',
                                                        color: 'white',
                                                        borderRadius: '5px',
                                                        fontSize: '14px',
                                                        lineHeight: '20px'
                                                    }}>
                                                        <span><IoMdCheckmark /> In Stock</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="separator1"></div>
                                        <h4 style={{
                                            color: '#1a365d',
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            marginBottom: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}>
                                            Select Quantity
                                        </h4>
                                        <div className="stockCounter d-inline">
                                            <span className="btn btn-sm minus-btn" onClick={decreaseQty}>
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </span>
                                            <input
                                                type="number"
                                                className="form-control count d-inline"
                                                value={quantity}
                                                readOnly
                                            />
                                            <span className="btn btn-sm plus-btn" onClick={increaseQty}>
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </span>
                                            <span>
                                                {product.stock < 6 && product.stock > 0 ? (
                                                    <span className="inline-block ml-13">
                                                        <div className="text-danger d-inline  ml-4">Hurry Up, Only {product.stock} left</div>
                                                    </span>
                                                ) : ("")}
                                            </span>
                                        </div>

                                        <div className="prod_details_buy_btn mt-4">
                                            <div className='row g-2'>
                                                <div className="col-6 col-md-6 col-lg-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                                                        onClick={addToBuy}
                                                        disabled={product.stock === 0}
                                                        style={{
                                                            padding: '10px',
                                                            backgroundColor: '#28a745',
                                                            fontWeight: '500',
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning-charge-fill me-2" viewBox="0 0 16 16">
                                                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                                                        </svg>
                                                        Buy Now
                                                    </button>
                                                </div>
                                                <div className="col-6 col-md-6 col-lg-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                                        onClick={handleAddItem}
                                                        disabled={product.stock === 0}
                                                        style={{
                                                            padding: '10px',
                                                            backgroundColor: '#007bff',
                                                            fontWeight: '500',
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill me-2" viewBox="0 0 16 16">
                                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                                                        </svg>
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="separator1"></div><br />

                                        <div className="prod_details_buy_btn">
                                            {product.product_code && (
                                                <div className="row">
                                                    {uniqueValues.map((propertyName, index) => {
                                                        if (propertyName) {
                                                            return (
                                                                <div key={index}>
                                                                    <h4 className="ml-3"
                                                                        style={{
                                                                            color: '#1a365d',
                                                                            fontWeight: '600',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.75rem'
                                                                        }}
                                                                    >Select {propertyName}</h4><br />
                                                                    <ul id="menu">
                                                                        <div className="selected">
                                                                            {getUniqueValues(arr1, arr2, arr3, index).map((value, i) => (
                                                                                <Link key={i} href={`/product-details/${Buffer.from(`${arrID[i]}`, 'binary').toString('base64')}`}>
                                                                                    <li className={`${product[`value${index + 1}`] === value ? 'list-active' : ''}`}>{value}</li>
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </ul><br /><br />
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {productDetails.length && productDetails[0]?.title?.length ? (

                                            <>

                                                <h4 style={{
                                                    color: '#1a365d',
                                                    fontSize: '1.3rem',
                                                    fontWeight: '600',
                                                    marginBottom: '1.5rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem'
                                                }}>Product Specification</h4>
                                                <table className="table table-striped" id="Table_id">

                                                    <thead>
                                                        <tr>
                                                            <th scope="col" colSpan="2" ><h3 style={{
                                                                color: '#1a365d',
                                                                fontWeight: '600',
                                                                alignItems: 'center',
                                                            }}>Technical Details</h3></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {productDetails.length &&
                                                            productDetails.map((field, i) => (
                                                                <tr className={`${r}${i + 1}`} id={i + 1}>
                                                                    <td className="text-muted">{field.title}</td>
                                                                    <td >{field.description}</td>
                                                                </tr>
                                                            ))}
                                                        <tr>
                                                            <td colSpan="2" className="pt-2 pb-2" align="left"><a onClick={hide} className="text-muted">
                                                                {r === "r" ? (<div><small>SHOW MORE </small><b >&#8743;</b></div>) : (<div><small>SHOW LESS </small><b >&#8744;</b></div>)}</a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </>

                                        ) : ("")}

                                        <br />
                                        {product.description &&
                                            <div className="prod_overview ">
                                                <div className="product-description-header" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', }}>
                                                    <h4 style={{
                                                        color: '#2c3e50',
                                                        fontSize: '1.35rem',
                                                        fontWeight: '600',
                                                        marginBottom: '0',
                                                        display: 'inline-flex',
                                                        position: 'relative',
                                                        color: '#1a365d',
                                                        fontSize: '1.3rem',
                                                        fontWeight: '600',
                                                        alignItems: 'center',
                                                        gap: '0.75rem'
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            style={{ color: '#3498db' }}
                                                        >
                                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                            <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                        </svg>
                                                        Product Description
                                                        <span style={{
                                                            position: 'absolute',
                                                            bottom: '-12px',
                                                            left: '0',
                                                            width: '40px',
                                                            height: '3px',
                                                            backgroundColor: '#3498db',
                                                            borderRadius: '3px'
                                                        }}></span>
                                                    </h4>
                                                </div>
                                                <ul className='par desc-bg'>
                                                    <ReadMore text={(String(product.description))} />
                                                </ul>
                                            </div>
                                        }
                                        <span className="container text-secondary fw-medium">
                                            Have a question? Feel free to ask&nbsp; <a href="tel:+918007779657" className=" bg-light fw-bold">+91 800 777 9657</a>. We're here to help!
                                        </span>

                                        <div className="separator1"></div>
                                        <div className="prod_details_offers">
                                            {coupons && coupons.length ? (
                                                <div className="offers-header" style={{
                                                    position: 'relative',
                                                    marginBottom: '1.75rem',
                                                    padding: '0.75rem 1rem',
                                                    backgroundColor: '#fff9f2',
                                                    borderRadius: '8px',
                                                    borderLeft: '4px solid #ff6b00'
                                                }}>
                                                    <h4 style={{
                                                        color: '#d35400',
                                                        fontSize: '1.4rem',
                                                        fontWeight: '700',
                                                        margin: '0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        fontFamily: '"Segoe UI", Roboto, sans-serif'
                                                    }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            viewBox="0 0 16 16"
                                                            style={{ color: '#ff6b00' }}
                                                        >
                                                            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                                        </svg>
                                                        Offers & Discounts
                                                        <span style={{
                                                            marginLeft: 'auto',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '600',
                                                            color: '#fff',
                                                            backgroundColor: '#ff6b00',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '12px',
                                                            display: 'inline-flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="12"
                                                                height="12"
                                                                fill="currentColor"
                                                                className="me-1"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                                            </svg>
                                                            Limited Time
                                                        </span>
                                                    </h4>
                                                </div>
                                            ) : ""}

                                            <ul>
                                                {coupons && coupons.length ? (
                                                    coupons.map((coupon) => {
                                                        const currentTime = new Date().getTime();
                                                        const couponLastDate = new Date(coupon.lastDate).getTime();

                                                        if (currentTime < couponLastDate) {
                                                            return (
                                                                <li key={coupon.id}>
                                                                    Apply coupon "{coupon.coupon_code}" to Get Rs. {coupon.cashback} on Rs. {coupon.minValue} minimum order product
                                                                </li>
                                                            );
                                                        } else {
                                                            return null; // Return null for expired coupons to avoid rendering
                                                        }
                                                    })
                                                ) : (
                                                    <li>Currently no offers available</li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="separator1"></div>

                                        <div className="py-3">
                                            <h4 style={{
                                                color: '#2c3e50',
                                                fontSize: '1.4rem',
                                                fontWeight: '700',
                                                margin: '0',
                                                fontFamily: '"Segoe UI", Roboto, sans-serif',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>

                                                Reviews
                                            </h4>


                                            <br />

                                            {session?.user ? (
                                                1 === 1 ? (
                                                    <div className="modal-body ">
                                                        <div className='row'>
                                                            <ul className="stars" onMouseOver={setUserRatings}>
                                                                <li className="star">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="star">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="star">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="star">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="star">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                            </ul>

                                                            <ul className="stars">
                                                                <li >
                                                                    <textarea
                                                                        name="review"
                                                                        id="review"
                                                                        className="form-control textAeraBorder"
                                                                        value={comment}
                                                                        rows="2"
                                                                        cols="45"
                                                                        placeholder='Write a review...'
                                                                        onChange={(e) => setComment(e.target.value)}
                                                                    ></textarea>
                                                                </li>
                                                                <li >
                                                                    <button
                                                                        style={{
                                                                            backgroundColor: '#007bff',
                                                                            color: 'white',
                                                                            padding: '0',
                                                                            border: 'none',
                                                                            borderRadius: '4px',
                                                                            cursor: 'pointer',
                                                                            fontSize: '16px',
                                                                            fontWeight: 'bold',
                                                                            height: '40px',
                                                                            width: '150px',
                                                                            display: 'inline-block',
                                                                            textAlign: 'center',
                                                                            lineHeight: '40px',
                                                                            textDecoration: 'none'
                                                                        }}
                                                                        onClick={reviewHandler}
                                                                    >
                                                                        Submit Review
                                                                    </button>

                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="alert alert-warning mt-5" type="alert">
                                                        Haven't purchased this product?<br />
                                                        Sorry! You are not allowed to review this product since you haven't bought it on SGSRO .
                                                    </div>
                                                )
                                            ) : (
                                                <div className="alert alert-danger mt-5" type="alert">
                                                    Login to post your review.
                                                </div>
                                            )}

                                            <ul>
                                                {reviews && reviews.slice(0, showAllReview ? reviews.length : 5).map(review => (
                                                    <div className='mt-3' key={review.id}>
                                                        <ProductReviews reviews={review} />
                                                    </div>
                                                ))}
                                                {reviews && reviews.length > 5 && !showAllReview && (
                                                    <button className='text-white p-3 bg-success ' onClick={() => setShowAllReview(true)}>Show More</button>
                                                )}
                                            </ul>

                                        </div>


                                    </div>

                                </div>
                            </div>
                        </section>




                        <section id="related_products" className="section">
                            <div className="container">
                                <SectionsHead heading="Related Products" />
                                <Suspense fallback={<div>Loading...</div>}>
                                    <MemoizedRelatedSlider productsRelated={relatedProduct} />
                                </Suspense>
                            </div>
                        </section>

                        <Services />
                        <ToastContainer />
                    </Fragment>
                }
            </div>
        </Fragment >
    )
}

export default index