import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Password reset link sent");
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
            <MdOutlinePassword />
          </span>
          <div>
            <strong>Recover Access</strong>
            <small>Reset your dashboard password</small>
          </div>
        </div>

        <div className="auth-heading">
          <p>Forgot Password</p>
          <h1>Get a secure reset link by email.</h1>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <div className="input-shell">
              <FiMail />
              <input type="email" placeholder="owner@restaurant.com" required />
            </div>
          </label>

          <button className="primary-button" type="submit">
            Send Reset Link
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/" className="back-link">
            <FiArrowLeft /> Back to login
          </Link>
        </p>
      </motion.section>
    </main>
  );
}

export default ForgotPassword;
