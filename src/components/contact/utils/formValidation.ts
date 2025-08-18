export const validateForm = (
  formData: {
    name: any;
    email: any;
    timeframe: any;
    budget: any;
    service: any;
  },
  projectType: string
) => {
  const { name, service, timeframe, budget, email } = formData;

  if (!name.trim()) {
    alert("Please enter your name");
    return false;
  }
  if (!service.trim()) {
    alert(
      projectType === "collab"
        ? "Please enter the project idea/service"
        : "Please enter the service type"
    );
    return false;
  }
  if (!timeframe.trim()) {
    alert(
      projectType === "collab"
        ? "Please enter your role"
        : "Please enter the project timeframe"
    );
    return false;
  }
  if (!budget.trim()) {
    alert(
      projectType === "collab"
        ? "Please enter the role you want Ahmed to play"
        : "Please enter your budget"
    );
    return false;
  }

  if (!email.trim()) {
    alert("Please enter your email");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  return true;
};
