import React, { useState } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setAuth } from "../../redux/reducers/authSlice";
import { postLoginData, googleTapRedirect } from "../../pages/api/fetchClient";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to check if input is email or phone
  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  // Function to format phone number
  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, "");

    // If it doesn't start with +, add +91
    if (!cleaned.startsWith("+")) {
      cleaned = cleaned.replace(/^\d{1,}/, (match) => {
        if (match.length === 10) {
          return "+91" + match;
        } else if (match.startsWith("91") && match.length === 12) {
          return "+91" + match.substring(2);
        }
        return "+91" + match;
      });
    }

    return cleaned;
  };

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");

    try {
      const input = values.email.trim();
      let payload = {
        password: values.password,
      };

      // Determine if input is email or phone
      if (isEmail(input)) {
        payload.email = input;
      } else {
        const formattedPhone = formatPhoneNumber(input);
        payload.phone = formattedPhone;
      }

      const res = await postLoginData(payload);

      // ✅ Store tokens
      Cookies.set("ptl_access_token", res?.data?.access_token);
      Cookies.set("refresh_token", res?.data?.refresh_token);

      // ✅ Store user in redux
      dispatch(setAuth(res?.data));

      const isPremium = res?.data?.user?.is_premium;

      // ✅ Redirect based on plan
      if (isPremium) {
        router.push("/stock-research-report");
      } else {
        router.push("/?upgrade=true");
      }
    } catch (err) {
      if (err.response?.data) {
        const errorData = err.response.data;
        // Handle validation errors from backend
        if (typeof errorData === "object") {
          const firstError = Object.values(errorData)[0];
          const errorMsg = Array.isArray(firstError)
            ? firstError[0]
            : firstError;
          setError(errorMsg || "Invalid credentials");
        } else {
          setError(errorData.message || "Invalid credentials");
        }
      } else {
        setError("Invalid credentials");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    const url = googleTapRedirect("/");
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <Form layout="vertical" onFinish={onSubmit} className={styles.form}>
        <Form.Item
          name="email"
          label={<span className={styles.fieldLabel}> Email / Mobile No</span>}
          required={false}
          rules={[{ required: true, message: "Enter email or mobile" }]}
        >
          <Input className={styles.input} placeholder="Email or Mobile" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className={styles.fieldLabel}>Password</span>}
          required={false}
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password className={styles.input} placeholder="Password" />
        </Form.Item>

        <button type="submit" className={styles.button}>
          {loading ? "Loading..." : "Login"}
        </button>

        {error && <p className={styles.errorText}>{error}</p>}
      </Form>

      <button onClick={handleGoogleLogin} className={styles.googleBtn}>
        Login with Google
      </button>
    </div>
  );
}
