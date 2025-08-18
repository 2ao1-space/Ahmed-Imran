export const sendEmailService = async (
  emailjs: {
    send: (
      arg0: any,
      arg1: any,
      arg2: {
        from_name: any;
        from_email: any;
        service: any;
        timeframe: any;
        budget: any;
        project_type: any;
        reply_to: any;
      },
      arg3: any
    ) => any;
  },
  formData: {
    name: any;
    email: any;
    timeframe: any;
    budget: any;
    service: any;
  },
  projectType: string | undefined
) => {
  const templateId =
    projectType === "collab"
      ? import.meta.env.PUBLIC_EMAILJS_COLLABORATION_TEMPLATE_ID
      : import.meta.env.PUBLIC_EMAILJS_PROJECT_TEMPLATE_ID;

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    service: formData.service,
    timeframe: formData.timeframe,
    budget: formData.budget,
    project_type: projectType,
    reply_to: formData.email,
  };

  const result = await emailjs.send(
    import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
    templateId,
    templateParams,
    import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
  );

  return result;
};
