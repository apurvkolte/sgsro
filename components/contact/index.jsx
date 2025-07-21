import SectionsHead from '../common/SectionsHead';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { newEnquiry, clearErrors } from "../../redux/actions/userActions";
import { getContact } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Parser from 'html-react-parser';
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const index = () => {
  const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
  const dispatch = useDispatch();
  const { contact } = useSelector(state => state.contact);
  const [contentHtml, setContentHtml] = useState('');

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



  const options = {
    inlineStyleFn: (styles) => {
      const styleObj = {};
      styles.forEach((style) => {
        if (style.startsWith('color-rgb')) {
          const color = style.replace('color-rgb', 'rgb');
          styleObj.color = color;
        }
        if (style.startsWith('bgcolor-rgb')) {
          const bgColor = style.replace('bgcolor-rgb', 'rgb');
          styleObj.backgroundColor = bgColor;
        }
        if (style.startsWith('fontsize-')) {
          const fontSize = style.replace('fontsize-', '') + 'px';
          styleObj.fontSize = fontSize;
        }
        if (style.startsWith('fontfamily-')) {
          const fontFamily = style.replace('fontfamily-', '');
          styleObj.fontFamily = fontFamily;
        }
      });
      if (Object.keys(styleObj).length > 0) {
        return {
          element: 'span',
          style: styleObj,
        };
      }
    },
    blockStyleFn: (block) => {
      const blockStyle = {};
      if (block.getData().get('color')) {
        blockStyle.color = block.getData().get('color');
      }
      if (Object.keys(blockStyle).length > 0) {
        return {
          style: blockStyle,
        };
      }
    },
    entityStyleFn: (entity) => {
      const entityType = entity.get('type').toLowerCase();
      if (entityType === 'image') {
        const data = entity.getData();
        return {
          element: 'img',
          attributes: {
            src: data.src,
          },
          style: {
            maxWidth: '100%',
          },
        };
      }
    },
  };

  useEffect(() => {
    if (contact && contact.contact) {
      try {
        const cleanedJsonString = contact.contact.replace(/\\/g, '');
        const parsedData = JSON.parse(cleanedJsonString);
        const contentState = convertFromRaw(parsedData);
        const html = stateToHTML(contentState, options);
        setContentHtml(html);
      } catch (error) {
        console.error('Error parsing content:', error);
        setContentHtml('<p>Error loading content</p>'); // Fallback content or error message
      }
    }
  }, [contact]);





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
  const socialMediaLinks = [
    {
      id: 1,
      icon: <FaFacebookF />,
      path: "https://www.facebook.com/rowaterpurifierspune/",
      bg: "#1877F2", // Facebook color
    },
    {
      id: 2,
      icon: <FaWhatsapp />,
      path: "https://wa.me/918007779657/",
      bg: "#25D366", // WhatsApp color
    },
    {
      id: 3,
      icon: <FaInstagram />,
      path: "https://www.instagram.com/zope.vaibhav/",
      bg: "#E4405F", // Instagram color
    },
  ];

  return (
    <>
      <div className='bg-page1'>
        <section className="about terms">
          <SectionsHead heading="Contact Us" /><br />

          <div className='container'>
            {Parser(contentHtml)}
            <hr />

            {/* Social Media Links */}
            <div className="social-links" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              {socialMediaLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: `${social.bg}`,
                    color: "#fff",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    textDecoration: "none",
                    fontSize: "20px",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className=" footer_contact_widget">
              <p>For any inquiries or assistance, please fill out the form below:</p>
              <center> <h3>Enquiry Form</h3></center>





              <div className="entries en-from border p-1" >
                <div className="blog-comments" data-aos="fade-up">
                  <div className="reply-form" style={{ padding: "10px" }}>
                    <form name="myform11" onSubmit={handleSubmit(submit)}>
                      <div className="row enquiryForm mb-2">
                        <div className="col-md-5 form-group">
                          <input name="Name" type="text" className="form-control footer-form-height in-from" value={name}
                            onChange={(e) => setName(e.target.value)} id="Name" placeholder="Name:" />
                        </div>
                        <div className="col-md-7 form-group">
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
                            placeholder="Mobile:" />
                        </div>
                        {errors.mobile && (
                          <small className="text-danger">{errors.mobile.message}</small>
                        )}
                      </div>
                      <div className="row enquiryForm  mb-2">
                        <div className="col form-group">
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
                            placeholder="Email:" />
                        </div>
                        {errors.email && (
                          <small className="text-danger">{errors.email.message}</small>
                        )}
                      </div>

                      <div className="row enquiryForm  mb-2">
                        <div className="col form-group" >
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
                            placeholder="Message : "></textarea>
                        </div>
                        {errors.message && (
                          <small className="text-danger">{errors.message.message}</small>
                        )}
                      </div>
                      <div className="row  mb-2">
                        <div className="col-md-4 ">
                          <button type="submit" className="btn btn-primary in-from" >Submit</button>
                        </div>
                        <div className="col-md-4">
                          <button type="reset" onClick={restefiled} className="btn btn-primary in-from" >Reset&nbsp;</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <br />
              <br />

              <h1
                style={{
                  fontSize: "11px",
                  fontWeight: "lighter",
                  lineHeight: "1.5",
                  display: "none"
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
            </div>
          </div>
          <ToastContainer />
        </section >
      </div>

    </>
  );
};

export default index;
