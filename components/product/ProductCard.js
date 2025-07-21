import React, { Fragment, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { displayMoney } from '../../helpers/utils';
import useActive from '../../hooks/useActive';
import { addItemToCart, addBuyItem } from '../../redux/actions/cartActions';
import { getDiscountUI } from '../../redux/actions/productActions';
import { Buffer } from 'buffer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const EID = useMemo(() => Buffer.from(`${product.id}`, 'binary').toString('base64'), [product.id]);

    const { active, handleActive, activeClass } = useActive(false);

    const handleAddItem = useCallback(() => {
        if (product.stock === 0) {
            toast.warning("Product is out of stock")
        } else {
            addToCart(EID);

        }
        // handleActive(EID);
        // setTimeout(() => {
        //     handleActive(false);
        // }, 3000);
    }, [EID, addToCart, handleActive]);

    const addToCart = useCallback((id) => {
        const BID = Buffer.from(id, 'base64').toString('binary');
        if (cartItems.length < 10) {
            const existingItem = cartItems.find(item => item.product === Number(BID));
            const count = existingItem ? existingItem.quantity : 0;

            dispatch(addItemToCart(id, quantity + count));
            toast.success("Item Added to Cart");
        } else {
            toast.error("Cart has touched the max limit. Please delete existing cart items to add a new item.");
        }
    }, [cartItems, dispatch, quantity]);

    return (
        <Fragment>
            <div className="card products_card">
                {product.discount > 0 && (
                    <div className="discount-badge">
                        {product.discount}% OFF
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="out-of-stock-badge">
                        Out of Stock
                    </div>
                )}

                <figure className="products_img">
                    <Link href={`/product-details/${EID}?${encodeURIComponent(product.name)}`}>
                        <img
                            src={`/uploads/product/${product.image}`}
                            loading="lazy"
                            alt={product.name}
                            className={product.stock === 0 ? "grayscale" : ""}
                        />
                    </Link>
                </figure>

                <div className="products_details">
                    <h5 className="products_title" style={{ height: '3em', overflow: 'hidden' }}>
                        <Link href={`/product-details/${EID}?${encodeURIComponent(product.name)}`}>{product.name}</Link>
                    </h5>
                    <h4 className="products_price">
                        {displayMoney(Math.round(product.sale_price))} &nbsp;
                        {product.discount > 0 && (<small><del>{displayMoney(Math.round(getDiscountUI(product.sale_price, product.discount)))}</del>
                            {/* <span className='cart-discount'>&nbsp;{product.discount}% Off</span> */}
                        </small>
                        )}
                    </h4>

                    <div className="button-container">
                        <Link href={`/product-details/${EID}?${encodeURIComponent(product.name)}`}>
                            <button type="button" className='btn view-details-btn'>
                                View Details
                            </button>
                        </Link>
                        <button
                            type="button"
                            className={`btn  add-to-cart-btn ${activeClass(EID)}`}
                            onClick={handleAddItem}
                        // disabled={product.stock === 0}
                        >
                            <i className="fa fa-cart-plus add-to-cart-icon fa-lg "></i>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductCard;
