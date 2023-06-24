import "../styles/globals.scss";
import { Poppins } from "next/font/google";

import Navbar from "@/components/navbarElements/Navbar";
import Newsletter from "@/components/sharedElements/Newsletter";
import Footer from "@/components/sharedElements/Footer";
import Contact from "@/components/sharedElements/Contact";
import { AuthContextProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "HowMuchDoesItWeight",
  description: "Browse and Explore a Variety of products",
};


export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body className={poppins.className}>
          <div id="overlays"></div>
          <Navbar />
          {children}
          <Newsletter />
          <Contact />
          <Footer />
        </body>
      </html>
    </AuthContextProvider>
  );
}
