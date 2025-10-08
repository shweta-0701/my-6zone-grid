import {
  Inter,
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Oswald,
  Merriweather,
  Happy_Monkey,
} from "next/font/google";

import "@/styles/grid.css";
// Add global styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const happyMonkey = Happy_Monkey({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-happy-monkey",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "6-Zone Grid Layout",
  description: "A versatile 6-zone grid layout for showcasing diverse content.  ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${happyMonkey.variable} ${poppins.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${oswald.variable} ${merriweather.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
