import {
  existingUserOTP,
  newUserPassword,
  resendOTP,
  verifyOTP,
} from "../pages/api/fetchClient";

export const updateMobileNumber = async (phone_number) => {
  // For existing users, we need to update the mobile number
  try {
    const res = await existingUserOTP({ phone_number });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const otpVerify = async (user) => {
  // For existing users, we need to verify the OTP
  try {
    const res = await verifyOTP({
      phone_number: user.phone_number,
      otp: user.otp,
      token: user.token,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const otpResend = async (phone_number) => {
  // For existing users, we need to verify the OTP
  try {
    const res = await resendOTP({ phone_number });
    return res;
  } catch (error) {
    console.log(error);
  }
};
