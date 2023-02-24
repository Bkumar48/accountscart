import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is required")
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    }
  });
  const {user, isloading, isError, isSuccess, message} = useSelector((state)=>state.auth);
  useEffect(()=>{
    if(!user == null || isSuccess){
      navigate('admin')
    }else{
      
    }
  },[user, isloading ,isError, isSuccess,message])
  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#ffd333", minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <form action="" onSubmit={formik.handleSubmit}>
          <h3 className="text-center title">Login</h3>
          <p className="text-center">Login to your Account to continue</p>
          <CustomInput
            type="text"
            name="email"
            label="Email Address"
            id="email"
            onCh={formik.handleChange("email")}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div> {formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            onCh={formik.handleChange("password")}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div> {formik.errors.password} </div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button
            to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
