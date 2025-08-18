import { useEffect, useState } from "react";

export const useEmailJS = () => {
  const [email, setEmail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const loadEmailJS = async () => {
      try {
        const emailJsModule = await import("@emailjs/browser");
        setEmail(emailJsModule.default || emailJsModule);
      } catch (err) {
        console.error("Failed to load EmailJs:", err);
      }
    };

    if (typeof window !== "undefined") {
      loadEmailJS();
    }
  }, []);

  return { email, isLoading, setIsLoading, isMounted };
};
