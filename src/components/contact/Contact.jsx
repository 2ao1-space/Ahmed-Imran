"use client";
import { useState } from "react";
import { useEmailJS } from "./hooks/useEmailJs";
import { validateForm } from "./utils/formValidation";
import { sendEmailService } from "./utils/emailService";
import { DynamicInput } from "./DynamicInput";
import { ProjectTypeSelector } from "./ProjectTypeSelector";
import { ContactTemplates } from "./ContactTemplates";
import { EmailLoadingState, SendingLoader } from "./LoadingStates";
import Btn from "../Btn";

export default function Contact() {
  // State management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timeframe: "",
    budget: "",
    service: "",
  });

  const [projectType, setProjectType] = useState("new-project");
  const { email, isLoading, setIsLoading, isMounted } = useEmailJS();

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      service: "",
      timeframe: "",
      budget: "",
      email: "",
    });
  };

  const handleProjectTypeChange = (type) => {
    setProjectType(type);
    // Reset form when switching project types but keep name and email
    setFormData((prevData) => ({
      name: prevData.name,
      email: prevData.email,
      timeframe: "",
      budget: type === "collab" ? "" : prevData.budget,
      service: "",
    }));
  };

  // Email sending logic
  const sendEmail = async () => {
    if (!validateForm(formData, projectType)) return;
    if (!email) {
      alert("EmailJS is still loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    try {
      await sendEmailService(email, formData, projectType);
      alert("Message sent successfully! Ahmed will get back to you soon.");
      resetForm();
    } catch (err) {
      console.error("EmailJS Error Details:", err);
      alert(
        "Failed to send message. Please try again or contact via WhatsApp."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Render dynamic input helper
  const renderDynamicInput = (name, placeholder) => (
    <DynamicInput
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      isLoading={isLoading}
      type={name === "email" ? "email" : "text"}
    />
  );

  // Get current template based on project type
  const currentTemplate = ContactTemplates[projectType];

  return (
    <div className="font-mainHead">
      {/* Project type selector */}
      <ProjectTypeSelector onTypeChange={handleProjectTypeChange} />

      {/* Dynamic contact template */}
      {currentTemplate(renderDynamicInput)}

      {/* Action buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Btn
          onClick={sendEmail}
          disabled={isLoading || !email}
          className="bg-primary-800 hover:bg-main text-tertiary px-4 rounded-full transition-all duration-500"
        >
          {isLoading ? "Sending..." : "[ Send Message ]"}
        </Btn>
      </div>

      {/* Loading states */}
      {!email && isMounted && <EmailLoadingState />}
      {isLoading && <SendingLoader />}
    </div>
  );
}
