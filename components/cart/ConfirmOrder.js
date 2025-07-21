import React, { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import axios from "axios";
import MetaData from '../layout/MetaData'
import { getAllUserCoupons } from '../../redux/actions/orderActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { myOrders } from '../../redux/actions/orderActions'
import ReadMoreCoupon from '../product/ReadMoreCoupon'
import { addItemToCart } from '../../redux/actions/cartActions'
import { Buffer } from 'buffer'
import RenderRazorpay from './RenderRazorpay';

const ConfirmOrder = () => {
    const dispatch = useDispatch();

    const [applyCoupon, setApplyCoupon] = useState();
    const [coupon_code, setCoupon_code] = useState('');
    const [order_code, setOrder_code] = useState(1);
    const [redeem, setRedeem] = useState(0);
    const [description, setDescription] = useState();

    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
    });

    const { cartItems } = useSelector(state => state.cart)
    const { buyItem, shippingInfo } = useSelector(state => state.buy)
    const { coupons } = useSelector(state => state.allUserCoupons);
    const { error, orders } = useSelector(state => state.myOrders);

    const shop = buyItem.length ? buyItem : cartItems;

    useEffect(() => {
        dispatch(getAllUserCoupons());
        dispatch(myOrders());
        // updateStockCheck()

        if (orders) {
            orders.forEach((or) => {
                if (or.coupon_code === applyCoupon) {
                    setOrder_code(0);
                }
            })
        }
        if (cartItems.length) {
            cartItems.forEach((item) => {
                dispatch(addItemToCart(Buffer.from((item.product).toString(), 'binary').toString('base64'), item.quantity))
            });
        }


    }, [dispatch, toast, redeem, error, applyCoupon, displayRazorpay, coupon_code])


    // Calculate Order Prices
    const itemsPrice = buyItem.length ? buyItem.reduce((acc, item) => acc + Number((item.sale_price)).toFixed(2) * item.quantity, 0)
        : cartItems.reduce((acc, item) =>
            (acc + (item.stock === 0 || item.stock < item.quantity ? 0 : Number(item.quantity * item.sale_price))), 0)
    // const shippingPrice = itemsPrice === 0 ? 0 : (itemsPrice > 50000 ? distance * 10 : shippingPriceDistance);
    const shippingPrice = itemsPrice === 0 ? 0 : (itemsPrice > 500 ? 0 : 0);
    const tax_amount = buyItem.length ? buyItem.reduce((acc, item) => acc + Number((item.tax_amount)).toFixed(2) * item.quantity, 0)
        : cartItems.reduce((acc, item) =>
            (acc + (item.stock === 0 || item.stock < item.quantity ? 0 : Number(item.quantity * item.tax_amount))), 0)

    const totalPrice = Number((itemsPrice + shippingPrice - redeem)).toFixed(2)


    const handleCreateOrder = async (totalPrice) => {
        const orderInfo = {
            itemsPrice: Number(itemsPrice).toFixed(2),
            shippingPrice,
            totalPrice,
            redeem,
            coupon_code
        };

        const order1 = {
            orderItems: JSON.stringify(shop),
            shippingInfo,
            orderInfo,
            shop_length: shop.length
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await axios.post('/api/payment',
            {
                amount: Number(itemsPrice) * 100,
                currency: "INR",
                order: order1
            }, config
        );

        // console.log("data", data.data.order_id);
        // console.log("data", data.data.amount, typeof data.data.amount);
        // console.log("totalPrice", totalPrice, typeof totalPrice);
        // console.log("Number(data.data.amount)", Number(data.data.amount), typeof Number(data.data.amount));
        // console.log("(Number(totalPrice) * 100)", (Number(totalPrice) * 100), typeof (Number(totalPrice) * 100));
        // console.log("data && data.data.order_id && data.data.amount == totalPrice", data && data.data.order_id && Number(data.data.amount) == (Number(totalPrice) * 100));

        if (data && data.data.order_id && Number(data.data.amount) == (Number(totalPrice) * 100)) {
            setOrderDetails({
                orderId: data.data.order_id,
                currency: data.data.currency,
                amount: data.data.amount,
            });
            setDisplayRazorpay(true);
        }
    }


    const getApplyCoupon = () => {
        if (applyCoupon) {
            if (order_code) {
                var cc = 1
                coupons && coupons.forEach((coupon) => {
                    if (coupon.coupon_code === applyCoupon) {
                        cc = 0;
                        if (coupon.coupon_code === applyCoupon) {
                            if (coupon.minValue <= itemsPrice) {
                                const x = new Date().toISOString().split('T')[0];
                                const y = coupon.lastDate.split('T')[0];
                                if (x <= y) {
                                    // console.log("cashback", coupon.cashback);
                                    // console.log("minValue", coupon.minValue);
                                    // console.log("description", coupon.description);
                                    setDescription(coupon.description);
                                    setRedeem(coupon.cashback);
                                    setCoupon_code(coupon.coupon_code);
                                    toast.info(<div style={{ textTransform: 'initial' }}>Voila..! {coupon.coupon_code} has been applied successfully.
                                        <br />Proceed to pay now to get cashback RS. {coupon.cashback}</div>);

                                    <small className="text-danger">{coupon.description}</small>;

                                } else {
                                    toast.error("Promo code has expired.");
                                }
                            } else {
                                toast.error(`This promo code required minimum price RS ${coupon.minValue}`);
                            }
                        }
                    }
                })
                if (cc) {
                    toast.error("Promo code is invalid.");
                }

            } else {
                setOrder_code(1);
                toast.error("You already applied this promotion");
            }
        } else {
            toast.error("Promo code is empty");
        }
    }

    return (
        <div className="container-fluid">
            <Fragment>
                <MetaData title={'Confirm Order'} />
                {/* <CheckoutSteps shipping confirmOrder /> */}
                <div className="row d-flex justify-content-between">
                    <div className="container-xl col-12 col-lg-8 mt-5 order-confirm">
                        <h4 className="mb-3 heading">Shipping Address:</h4>
                        <table>
                            <tr>
                                <td>
                                    <p><b>Name:</b> {shippingInfo && shippingInfo.name}</p>
                                </td>
                                <td>
                                    <p><b>Phone:</b> {shippingInfo.mobile}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {shippingInfo.gstn ? <p><b>GSTN No:</b> {shippingInfo.gstn} </p> : ""}
                                </td>
                            </tr>
                        </table>

                        <p className="mb-4"><b>Address:</b> {`${shippingInfo.flat ? shippingInfo.flat + "," : ""} ${shippingInfo.area ? shippingInfo.area + "," : ""}
                        ${shippingInfo.landmark ? shippingInfo.landmark + "," : ""} ${shippingInfo.city ? shippingInfo.city + "," : ""}
                         ${shippingInfo.state ? shippingInfo.state + "," : ""} ${shippingInfo.country ? shippingInfo.country + "," : ""} ${shippingInfo.postalCode ? shippingInfo.postalCode : ""}`}</p>


                        <hr />
                        <h4 className="mt-4 heading">Your Purching Items:</h4>

                        {buyItem.length ? (
                            buyItem.map(item => (
                                <Fragment>
                                    <hr />
                                    <div className="cart-item my-1" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-2">
                                                <img src={`/uploads/product/${item.image}`} alt={`${item.name}`} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-6" >
                                                <Link href={`/product-details/${Buffer.from((item.product).toString(), 'binary').toString('base64')}?${encodeURIComponent(item.name)}`} style={{ color: "#000080" }}>{item.name}</Link>
                                            </div>

                                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                <p>{item.quantity} x RS {Number((item.sale_price)).toLocaleString('en-IN', { maximumFractionDigits: 2 })} = <b>RS {Number((item.quantity * item.sale_price)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>
                            ))
                        ) : (
                            cartItems.map(item => (
                                (item.stock === 0 || item.stock < item.quantity) ? ("") : (<Fragment>
                                    <hr />
                                    <div className="cart-item my-1" key={item.product}>
                                        <div className="row">
                                            <div className="col-4 col-lg-2">
                                                <img src={`/uploads/product/${item.image}`} alt={`${item.name}`} height="40" width="60" />
                                            </div>

                                            <div className="col-5 col-lg-6" >
                                                <Link href={`/product-details/${Buffer.from((item.product).toString(), 'binary').toString('base64')}?${encodeURIComponent(item.name)}`} style={{ color: "#000080" }}>{item.name}</Link>
                                            </div>

                                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                                <p>{item.quantity} x RS {Number((item.sale_price)).toLocaleString('en-IN', { maximumFractionDigits: 2 })} = <b>RS {Number((item.quantity * item.sale_price)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</b></p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>)
                            ))
                        )}

                    </div>
                    <div className="col-12 col-lg-3 my-1">
                        <div id="order_summary">
                            <h4 className='heading'>Order Summary</h4>
                            <hr />
                            <div className="col form-group">
                                <input
                                    type="text"
                                    id="name_field"
                                    placeholder='Please enter the coupon code'
                                    className={`form-control`}
                                    value={applyCoupon}
                                    onChange={(e) => setApplyCoupon(e.target.value)}
                                />
                                {description ? (<ReadMoreCoupon text={description} />) : ""}

                            </div>
                            <div className="col form-group">
                                <div className="d-flex justify-content-center">
                                    <input className='btn text-white px-2 py-1 btn-default' type='button' onClick={getApplyCoupon} value="Apply Coupon" />
                                </div>
                            </div>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">&#8377; {(itemsPrice - tax_amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                            <p>Total GST:  <span className="order-summary-values">&#8377; {tax_amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                            {shippingPrice ? <p>Shipping cost: <span pan className="order-summary-values">&#8377; {shippingPrice.toFixed(2)}</span></p> : ""}
                            {/* <p>Estimated tax:  <span className="order-summary-values">&#8377; {taxPrice}</span></p> */}
                            {redeem ? <p>Coupon Amount:  <span className="order-summary-values">&#8209; &nbsp; &#8377; {redeem}</span></p> : ""}
                            <hr />
                            <p>Total: <span className="order-summary-values">&#8377; {Number(totalPrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                            <hr />

                            {displayRazorpay ? (
                                <RenderRazorpay
                                    amount={orderDetails.amount}
                                    currency={orderDetails.currency}
                                    orderId={orderDetails.orderId}
                                    keyId="fJtN"
                                    keySecret="SpQM"
                                />) : (
                                (totalPrice && shippingInfo.mobile) ? (
                                    <center><button className="btn btn-primary" disabled={!totalPrice || totalPrice <= 0} onClick={() => handleCreateOrder(Number(totalPrice).toFixed(2))} >Proceed to Payment</button></center>
                                ) : (
                                    <div class="alert alert-danger" role="alert">
                                        <h4 class="alert-heading">Payment</h4>
                                        <p>Sorry, Could not initiate transaction please try again.</p>
                                        <hr />
                                    </div>
                                )
                            )
                            }
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Fragment >
        </div >
    )
}

export default ConfirmOrder
