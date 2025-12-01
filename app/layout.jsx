import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nikolaus Nathaniel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-black text-gray-100 antialiased overflow-x-hidden`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            zIndex: 99999,
          }}
          toastOptions={{
            className: "",
            style: {
              background: "rgba(20, 20, 20, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              padding: "16px",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}
