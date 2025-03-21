import * as Yup from "yup";

export const step1 = Yup.object().shape({
  needType: Yup.string().required("Service type is required"),
});

export const step2 = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const step3 = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required("Password is required"),
    
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const step4 = Yup.object().shape({
  agreeTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
});