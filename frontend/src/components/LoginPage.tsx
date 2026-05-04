import React, { useState, FormEvent, ChangeEvent } from 'react';
import { OtpSendResponse, LoginResponse, ApiErrorResponse, AuthFormErrors } from '../types';
import './LoginPage.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface LoginPageProps {
  onLoginSuccess: (token: string) => void;
}

type LoginStep = 'email' | 'otp';

/**
 * Login page component with OTP-based authentication
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [message, setMessage] = useState<string>('');

  /**
   * Validates email address format
   * @param emailAddress - Email address to validate
   * @returns Error message or empty string if valid
   */
  const validateEmail = (emailAddress: string): string => {
    if (!emailAddress.trim()) {
      return 'Email address is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  /**
   * Validates OTP format
   * @param otpValue - OTP to validate
   * @returns Error message or empty string if valid
   */
  const validateOtp = (otpValue: string): string => {
    if (!otpValue.trim()) {
      return 'OTP is required';
    }
    if (otpValue.length < 4 || otpValue.length > 6) {
      return 'OTP must be 4-6 digits';
    }
    if (!/^\d+$/.test(otpValue)) {
      return 'OTP must contain only numbers';
    }
    return '';
  };

  /**
   * Handles sending OTP to email address
   */
  const handleSendOtp = async (e?: FormEvent<HTMLFormElement>): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    setErrors({});
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to send OTP');
      }

      const data: OtpSendResponse = await response.json();
      setMessage(data.message);
      setStep('otp');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP verification and login
   */
  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim() })
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to verify OTP');
      }

      const data: LoginResponse = await response.json();
      
      // Store token in session storage
      sessionStorage.setItem('authToken', data.token);
      sessionStorage.setItem('userEmail', data.user.email);
      
      onLoginSuccess(data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles email input change
   */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  /**
   * Handles OTP input change
   */
  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setOtp(e.target.value);
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }
  };

  /**
   * Handles going back to email input step
   */
  const handleBack = (): void => {
    setStep('email');
    setOtp('');
    setErrors({});
    setMessage('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Customer Dashboard</h1>
          <p>Sign in to manage your customers</p>
        </div>

        {step === 'email' ? (
          <form className="login-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                disabled={isLoading}
                autoFocus
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {errors.submit && (
              <div className="error-banner">
                <span>{errors.submit}</span>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleVerifyOtp}>
            {message && (
              <div className="success-banner">
                <span>{message}</span>
              </div>
            )}

            <div className="email-display">
              <span>OTP sent to: <strong>{email}</strong></span>
              <button type="button" className="change-btn" onClick={handleBack}>
                Change
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 4-6 digit OTP"
                maxLength={6}
                disabled={isLoading}
                autoFocus
              />
              {errors.otp && <span className="error-text">{errors.otp}</span>}
              <span className="hint-text">Any OTP works for testing</span>
            </div>

            {errors.submit && (
              <div className="error-banner">
                <span>{errors.submit}</span>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button type="button" className="resend-btn" onClick={() => handleSendOtp()} disabled={isLoading}>
              Resend OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
