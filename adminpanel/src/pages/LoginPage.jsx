import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import "../App.css";


let schema = Yup.object().shape({
  email: Yup.string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: Yup.string().required("Password is required")
});


const LoginPage = () => {
  let x = document.getElementById("hands");
  let y = document.getElementById("animcon");

  function closeEye() {
    y.style.backgroundImage =
      "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)";
    x.style.marginTop = "0%";
  }

  function openEye() {
    y.style.backgroundImage =
      "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)";
    x.style.marginTop = "110%";
  }


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    }
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);
  return (


    
    <div className="maincontainer">
      <div className="monkeylogin">
        <div className="animcon" id="animcon">
          <img
            id="hands"
            src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png"
            alt="img"
          />
        </div>
        
        <div className="formcon">
        
          <form action="" onSubmit={formik.handleSubmit}>
            
            <CustomInput
              type="text"
              name="email"
              label="Email Address"
              id="email"
              onCh={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
              i_class="input"
              onCl={openEye}
            />
            <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>

            <CustomInput
              type="password"
              name="password"
              label="Password"
              id="pass"
              onCh={formik.handleChange("password")}
              onBlr= {formik.handleBlur("password")}
              val={formik.values.password}
              i_class="input"
              onCl={closeEye}
            />
            <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
            <br />
            <div className="mb-3 text-end">
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <button className="sbutton" type="submit">
              LOGIN
            </button>
          </form>
          
        </div>
        <footer className="foot">
        <div className="error">
          {message.message == "Rejected" ? "You are not an Admin" : ""}
        </div>
          <a style={{ color: "#bababa", textDecoration: "none" }} href="#">
            Accounts 🛒Cart
          </a>
        </footer>
      </div>
    </div>

  );
  
};

export default LoginPage;
