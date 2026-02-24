import { Link, useNavigate } from "react-router";
import { FormInput, ToggleButton } from "../../components";
import { useState } from "react";
import { registerAPI } from "./loginRegisterAPI";
import { handleChange } from "../../../utilities/event-helper";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    isSeller: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAPI(formData);
    navigate("/auth/login", {
      state: { email: formData.email },
    });
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form method="POST" onSubmit={handleSubmit}>
        {["name", "email", "password", "phone", "address"].map((field) => (
          <FormInput
            name={field}
            value={formData[field]}
            setFunc={(val) => handleChange(setFormData, field, val)}
            key={`registrationform-${field}`}
          />
        ))}
        <ToggleButton
          value={formData.isSeller}
          setFunc={(val) => handleChange(setFormData, "isSeller", val)}
        />
        <button>Login</button>
      </form>
      <div>
        <Link to="/auth/login">Already registered? Click here</Link>
        <br />
        <Link to="#">Forgot Password</Link>
      </div>
    </div>
  );
};

export { Register };
