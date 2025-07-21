import SectionsHead from '../common/SectionsHead';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { newEnquiry, clearErrors } from "../../redux/actions/userActions";
import { getContact } from "../../redux/actions/userActions";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Parser from 'html-react-parser';

const index = () => {
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const dispatch = useDispatch();
    const { contact } = useSelector(state => state.contact);

    const contactUs = Parser(`${contact?.contact}`);
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const { success, error } = useSelector(state => state.enquiry);
    const [message, setMessage] = useState();
    const [user_id, setUser_id] = useState(0);

    useEffect(() => {
        dispatch(getContact());

        if (success) {
            toast.success("Request has been send successfully");
            dispatch(clearErrors());
        }

        if (error) {
            toast.error(error);
        }

    }, [dispatch, success, error])


    function restefiled() {
        setName("")
        setMobile()
        setEmail("")
        setMessage("")
    }

    function submit(data, e) {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("mobile", mobile);
        formData.set("email", email);
        formData.set("message", message);
        formData.set("user_id", user_id);

        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = object

        dispatch(newEnquiry(json));
        reset();
        restefiled();
    }


    return (
        <div className='container d-flex justify-content-center p-5'>

            <section className='col-md-7 '>
                <SectionsHead heading="Enquiry Form" /><br />

                <div className="box footer_contact_widget">

                    <div className="entries en-from border p-1" >
                        <div className="blog-comments" data-aos="fade-up">
                            <div className="reply-form" style={{ padding: "10px" }}>
                                <form name="myform11" onSubmit={handleSubmit(submit)}>
                                    <div className="row enquiryForm mb-2">
                                        <div className="col-md-5 form-group">
                                            <label>Name:</label>
                                            <input name="Name" type="text" className="form-control footer-form-height in-from" value={name}
                                                onChange={(e) => setName(e.target.value)} id="Name" placeholder="Enter your name" />
                                        </div>
                                        <div className="col-md-7 form-group">
                                            <label>Mobile:</label>
                                            <input type="tel" name="Mobile" inputmode="numeric" id="Mobile"
                                                className={`form-control footer-form-height ${errors.mobile && "invalid"}`}
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
                                                onKeyUp={() => {
                                                    trigger("mobile");
                                                }}
                                                required
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="Enter your mobile number" />
                                        </div>
                                        {errors.mobile && (
                                            <small className="text-danger">{errors.mobile.message}</small>
                                        )}
                                    </div>
                                    <div className="row enquiryForm  mb-2">
                                        <div className="col form-group">
                                            <label>Email Address:</label>
                                            <input type="email" name="Email"
                                                id="Email"
                                                className={`form-control footer-form-height ${errors.email_field && "invalid"}`}
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
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address" />
                                        </div>
                                        {errors.email && (
                                            <small className="text-danger">{errors.email.message}</small>
                                        )}
                                    </div>

                                    <div className="row enquiryForm  mb-2">
                                        <div className="col form-group" >
                                            <label>Message:</label>
                                            <textarea name="Address" id="Address" rows={3}
                                                className={`form-control ${errors.message && "invalid"}`}
                                                {...register("message", {
                                                    minLength: {
                                                        value: 10,
                                                        message: "Length of message should be more characters",
                                                    },
                                                    maxLength: {
                                                        value: 500,
                                                        message: "Maximum Allowed Length Should Be 500 ",
                                                    }
                                                })}
                                                onKeyUp={() => {
                                                    trigger("message");
                                                }}
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Enter your message here"></textarea>
                                        </div>
                                        {errors.message && (
                                            <small className="text-danger">{errors.message.message}</small>
                                        )}
                                    </div>
                                    <div className="row  mb-2">
                                        <div className="col-md-3 ">
                                            <button type="submit" className="btn btn-primary in-from" >Submit</button>
                                        </div>
                                        <div className="col-md-3">
                                            <button type="reset" onClick={restefiled} className="btn btn-primary in-from" >Reset&nbsp;</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <br />

                <h1
                    style={{
                        fontSize: "12px",
                        fontWeight: "lighter",
                        lineHeight: "1.5",
                    }}
                >
                    Looking for the best water purifier in Pune? Check out top brands like Kent and Aquaguard,
                    known for their RO water purifiers. Find good water purifier dealers in Pune who can help
                    with water purifier installation in Pune and water purifier service in Pune. Regular
                    maintenance and timely water purifier repair in Pune keep your purifier working well. There
                    are many options at different water purifier prices in Pune to match your budget, ensuring
                    you have clean, safe drinking water for your family. Whether you live in Moshi, Wakad, Pimple
                    Saudagar, Bavdhan, Kharadi, Katraj, Talegaon, Ravet, Punawale, or PCMC, you can find the right
                    purifier for your needs.
                </h1>
            </section >
        </div>

    );
};

export default index;
