import React, { Fragment, useState, useEffect } from "react";
import { countries } from "countries-list";
import { useRouter } from 'next/router'
import MetaData from "../layout/MetaData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { insertAddress, indianState, clearErrors } from "../../redux/actions/userActions";
import { useForm } from "react-hook-form";
import { ADD_ADDRESS_RESET } from '../../redux/constants/userConstants'
import { capitalCase } from "capital-case";
var pincodeDirectory = require('india-pincode-lookup');

const AddNewAddress = () => {
  const router = useRouter()
  // const location = useLocation();
  const countriesList = Object.values(countries);
  // US:{name: united state, city: malkapur}
  // console.log("location.state", location.state);


  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm();

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.addressDetails);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      // router.push('/me/update/myaddress', { state: location.state });
      router.push('/my-address');
      toast.success("Address Added successfully");
      dispatch({ type: ADD_ADDRESS_RESET });
    }

  }, [dispatch, router.push, error, success, toast]);

  const submitHandler = (data, e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("mobile", mobile.replace(/\s/g, ''));
    formData.set("flat", flat);
    formData.set("area", area);
    formData.set("landmark", landmark);
    formData.set("city", city);
    formData.set("state", state);
    formData.set("country", country);
    formData.set("postalCode", postalCode);

    const pincodeDir = pincodeDirectory.lookup(postalCode);

    var object = {};
    formData.forEach((value, key) => object[key] = value);
    var json = object

    if (pincodeDir.length === 0) {
      toast.error('Your Entered Postal Code Is Not Valid')
    } else {
      dispatch(insertAddress(json));
      reset();
    }
  };

  function postalAddress(postalCode) {
    const pincodeDir = pincodeDirectory.lookup(postalCode);
    if (pincodeDir.length) {
      setState(capitalCase(pincodeDir[0].stateName.toLowerCase()))
      setCity((pincodeDir[0].taluk === 'NA' ? "" : pincodeDir[0].taluk + ", Ds: ") + pincodeDir[0].districtName)
      setCountry("India")
    }
  }

  return (
    <Fragment>
      <MetaData title={"Your Address"} />

      <div className="row wrapper1">
        <div className="col-12 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit(submitHandler)}>
            <h2 className="mb-4 heading">Add Address</h2>
            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                name="name_field"
                className={`form-control ${errors.name_field && "invalid"}`}
                {...register("name_field", {
                  required: "Pleade Enter the Full Name",
                })}
                oninvalid={() => {
                  trigger("name_field");
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name_field && (
                <small className="text-danger">{errors.name_field.message}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Mobile Number</label>
              <input
                type="text"
                id="phone_field"
                className={`form-control ${errors.phone_field && "invalid"}`}
                {...register("phone_field", {
                  required: "Mobile Number is Required",
                  pattern: {
                    value: /^(?:(?:\+|0{0,2})91(\s*[ -]\s*)?|[0]?)?[789]\d{9}$/g,
                    message: "Invalid Mobile Number",
                  },
                  maxLength: {
                    value: 15,
                    message: "Invalid Mobile Number",
                  }
                })}
                oninvalid={() => {
                  trigger("phone_field");
                }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />{errors.phone_field && (
                <small className="text-danger">{errors.phone_field.message}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="text"
                id="postal_code_field"
                className={`form-control ${errors.postal_code_field && "invalid"}`}
                {...register("postal_code_field", {
                  required: "Postal Code is Required",
                  pattern: {
                    value: /^\d{3}\s?\d{3}$/,
                    message: "Your Entered Zip Code Is Not Valid.",
                  },
                })}
                oninvalid={() => {
                  trigger("postal_code_field");
                }}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onKeyUp={() => postalAddress(postalCode)}
              />
              {errors.postal_code_field && (
                <small className="text-danger">{errors.postal_code_field.message}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address_field">Flat, House no., Building, Company, Apartment</label>
              <input
                type="text"
                id="address_field"
                name="address_field"
                className={`form-control ${errors.address_field && "invalid"}`}
                {...register("address_field", {
                  required: "Flat, House no., Building, Company, Apartment is Required",
                  minLength: {
                    value: 3,
                    message: "Please Enter Full Address",
                  }
                })}
                oninvalid={() => {
                  trigger("address_field");
                }}
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
              />
              {errors.address_field && (
                <small className="text-danger">{errors.address_field.message}</small>
              )}
            </div>


            <div className="form-group">
              <label htmlFor="area_field">Area, Street, Sector, Village</label>
              <input
                type="text"
                id="area_field"
                name="area_field"
                className="form-control invalid"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="landmark_field">Landmark</label>
              <input
                type="text"
                id="landmark_field"
                name="landmark_field"
                className="form-control invalid"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">Town/City</label>
              <input
                type="text"
                id="city_field"
                className="form-control invalid"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <select
                type="text"
                id="state_field"
                name="state_field"
                className="form-control"
                value={state}
                required
                defaultValue={{ label: "Please Select the State", value: 0 }}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Please select a state...</option>
                {indianState.map((state) => (
                  <option key={state.key} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                defaultValue={{ label: "Select Country", value: 0 }}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Please select a country...</option>
                {countriesList.map((coun) => (
                  <option key={country.name} value={coun.name}>
                    {coun.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button
                id="shipping_btn"
                type="submit"
                className="btn btn-block py-3"
              >
                ADD ADDRESS
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default AddNewAddress;
