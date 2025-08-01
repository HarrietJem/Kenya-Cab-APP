import React, { useState, useEffect, useRef } from 'react';
import { Phone, Shield, Clock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const OTPVerification = ({ onVerificationComplete, onGoBack }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const otpRefs = useRef([]);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\\D/g, '');
    
    // Handle different input scenarios
    if (digits.startsWith('254')) {
      // Full international format
      return '+' + digits.slice(0, 12);
    } else if (digits.startsWith('0')) {
      // Local format starting with 0
      const withoutLeadingZero = digits.slice(1);
      return '+254' + withoutLeadingZero.slice(0, 9);
    } else if (digits.length > 0 && !digits.startsWith('254')) {
      // Assuming local number without leading 0
      return '+254' + digits.slice(0, 9);
    }
    
    return value;
  };

  // Validate Kenyan phone number
  const isValidKenyanNumber = (number) => {
    const cleanNumber = number.replace(/\\D/g, '');
    // Should be 254 followed by 9 digits (254XXXXXXXXX)
    return /^254[0-9]{9}$/.test(cleanNumber);
  };

  const handlePhoneSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    
    if (!isValidKenyanNumber(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate SMS API call (replace with actual SMS service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, call your SMS API here
      console.log('Sending OTP to:', phoneNumber);
      
      setStep('otp');
      setCountdown(60);
      setSuccess('OTP sent successfully!');
      
      // Focus first OTP input after a short delay
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 100);
      
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleOtpVerify(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpVerify = async (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification (replace with actual verification API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept '123456' as valid OTP
      if (otpValue === '123456' || otpValue.includes('1')) {
        setSuccess('Phone number verified successfully!');
        setTimeout(() => {
          if (onVerificationComplete) {
            onVerificationComplete({
              phoneNumber,
              verified: true
            });
          }
        }, 1500);
      } else {
        setError('Invalid OTP. Please check and try again.');
        // Clear OTP fields on error
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      setSuccess('New OTP sent!');
    } catch (error) {
      setError('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          {step === 'otp' && (
            <button 
              onClick={() => setStep('phone')} 
              className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {step === 'phone' ? (
                <Phone size={24} className="text-blue-600" />
              ) : (
                <Shield size={24} className="text-blue-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'phone' ? 'Enter Phone Number' : 'Verify Your Number'}
            </h2>
            <p className="text-gray-600">
              {step === 'phone' 
                ? "We'll send you a verification code via SMS"
                : `Code sent to ${phoneNumber}`
              }
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500" />
            <span className="text-green-700 text-sm">{success}</span>
          </div>
        )}

        {/* Phone Number Step */}
        {step === 'phone' && (
          <div className="space-y-6">
            <div>
              <input
                ref={phoneInputRef}
                type="tel"
                placeholder="+254 700 000 000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handlePhoneSubmit(e);
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                maxLength={13}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Enter your Kenyan mobile number to receive a verification code
              </p>
            </div>

            <button 
              onClick={handlePhoneSubmit}
              disabled={isLoading || !isValidKenyanNumber(phoneNumber)}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => otpRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              ))}
            </div>

            {countdown > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">Resend code in {formatCountdown(countdown)}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleOtpVerify()}
                disabled={isLoading || otp.some(digit => digit === '')}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                onClick={handleResendOtp}
                disabled={countdown > 0 || isLoading}
                className="w-full py-2 px-4 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {countdown > 0 ? `Resend in ${formatCountdown(countdown)}` : 'Resend Code'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                For demo: use "123456" or any code containing "1"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo wrapper component
const App = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const handleVerificationComplete = (data) => {
    setVerificationData(data);
    setIsVerified(true);
  };

  const handleGoBack = () => {
    setIsVerified(false);
    setVerificationData(null);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Complete!</h2>
          <p className="text-gray-600 mb-4">
            Your phone number {verificationData?.phoneNumber} has been successfully verified.
          </p>
          <button
            onClick={handleGoBack}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <OTPVerification 
      onVerificationComplete={handleVerificationComplete}
      onGoBack={handleGoBack}
    />
  );
};

export default App;