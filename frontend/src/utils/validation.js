export const validateName = (value) => {
    if (value.length < 20) return "Name must be at least 20 characters long.";
    if (value.length > 60) return "Name must be no more than 60 characters long.";
    return true;
  };
  
  export const validateAddress = (value) => {
    if (value.length > 400) return "Address must be no more than 400 characters long.";
    return true;
  };
  
  export const validatePassword = (value) => {
    if (value.length < 8) return "Password must be 8-16 characters long.";
    if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must include at least one special character.";
    return true;
  };
  
  export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
    return true;
  };