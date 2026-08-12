import { User } from "@prisma/client";
import { Send } from "lucide-react";
import Image from "next/image";

type Props = {
  user: Pick<User, "id" | "name" | "email" | "image">;
};

const ContactForm = ({ user }: Props) => {
  if (!user) return null;
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
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          className="border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          rows={5}
          placeholder="Your Message"
          required
          className="resize-none border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <button type="submit" className="inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl text-white font-semibold cursor-pointer transition-colors duration-200">
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
