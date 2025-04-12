import { ContactInfo } from "../types";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ContactProps {
  contactInfo: ContactInfo;
}

export function Contact({ contactInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
    captcha: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
      captcha: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Numele este obligatoriu";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Introduceți un email valid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesajul este obligatoriu";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = await recaptchaRef.current?.executeAsync();

      if (!token) {
        setErrors((prev) => ({
          ...prev,
          captcha: "Vă rugăm să verificați că nu sunteți robot",
        }));
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken: token }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Clear form and show success message
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      recaptchaRef.current?.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
            Contact
          </span>
          <h2 className="text-3xl font-light text-[#333333] mb-4">
            Suntem <span className="font-bold">Aici</span>
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Pentru orice întrebări sau pentru a discuta despre proiectul
            dumneavoastră, nu ezitați să ne contactați.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-sm shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F5F5F5] rounded-full">
                  <Phone className="h-5 w-5 text-[#D6A461]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333]">Telefon</h3>
                  <p className="text-[#666666]">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F5F5F5] rounded-full">
                  <Mail className="h-5 w-5 text-[#D6A461]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333]">Email</h3>
                  <p className="text-[#666666]">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#F5F5F5] rounded-full">
                  <MapPin className="h-5 w-5 text-[#D6A461]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333]">Adresă</h3>
                  <p className="text-[#666666]">{contactInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#333333] mb-6">
                Trimite-ne un mesaj
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nume"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.name ? "border-red-500" : "border-[#E5E5E5]"
                    } rounded-sm focus:outline-none focus:border-[#D6A461]`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.email ? "border-red-500" : "border-[#E5E5E5]"
                    } rounded-sm focus:outline-none focus:border-[#D6A461]`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Mesaj"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border ${
                      errors.message ? "border-red-500" : "border-[#E5E5E5]"
                    } rounded-sm focus:outline-none focus:border-[#D6A461]`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    size="normal"
                    onChange={(token) => {
                      if (token) {
                        setErrors((prev) => ({ ...prev, captcha: "" }));
                      }
                    }}
                  />
                </div>
                {errors.captcha && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.captcha}
                  </p>
                )}

                {submitStatus === "success" && (
                  <div className="text-green-600 text-sm">
                    Mesajul a fost trimis cu succes! Vă vom contacta în curând.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 text-sm">
                    A apărut o eroare la trimiterea mesajului. Vă rugăm să
                    încercați din nou.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D6A461] text-white py-3 rounded-sm hover:bg-[#C89551] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
