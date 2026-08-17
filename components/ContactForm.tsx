"use client";
import { User } from "@prisma/client";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: Pick<User, "id" | "name" | "email" | "image">;
  session: Session | null;
};

type Session = typeof authClient.$Infer.Session;

const ContactForm = ({ user, session }: Props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleInputValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!session || !session.user) {
      toast.error("You need to be authenticated first!");
      return;
    }
    try {
      setIsLoading(true);
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: user.email,
          from_name: formValues.name,
          from_email: formValues.email,
          from_phone: formValues.phone || "N/A",
          message: formValues.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully!");
      setFormValues({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-4xl shadow-md p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 overflow-hidden rounded-full shrink-0 relative">
          <Image
            src={user.image || ""}
            alt={user.name}
            fill
            className="object-cover object-center"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <span className="text-gray-600">Property Agent</span>
        </div>
      </div>
      <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
        <input
          onChange={handleInputValues}
          value={formValues.name}
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          onChange={handleInputValues}
          value={formValues.email}
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          onChange={handleInputValues}
          value={formValues.phone}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          onChange={handleInputValues}
          value={formValues.message}
          name="message"
          rows={5}
          placeholder="Your Message"
          required
          className="resize-none border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <button
          disabled={isLoading}
          type="submit"
          className="inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl text-white font-semibold cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {" "}
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
