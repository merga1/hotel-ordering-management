import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Welcome back to your dashboard");
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <motion.section
        className="auth-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="auth-brand">
          <span className="brand-mark">
            <MdRestaurantMenu />
          </span>
          <div>
            <strong>TableTap Admin</strong>
            <small>QR ordering management</small>
          </div>
        </div>

        <div className="auth-heading">
          <p>Welcome Back</p>
          <h1>Manage today&apos;s restaurant flow.</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <div className="input-shell">
              <FiMail />
              <input type="email" placeholder="owner@restaurant.com" required />
            </div>
          </label>

          <label className="field">
            <span>Password</span>
            <div className="input-shell">
              <FiLock />
              <input type="password" placeholder="Enter your password" required />
            </div>
          </label>

          <div className="form-row">
            <label className="check-row">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          New restaurant account? <Link to="/register">Create account</Link>
        </p>
      </motion.section>

      <aside className="auth-aside">
        <div>
          <p className="eyebrow">Live operations</p>
          <h2>Orders, tables, kitchen, payments, and guests in one calm workspace.</h2>
        </div>
        <div className="mini-metrics">
          <span>42 orders today</span>
          <span>18 active tables</span>
          <span>97% paid</span>
        </div>
      </aside>
    </main>
  );
}

export default Login;
