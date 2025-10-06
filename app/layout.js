import {
  Inter,
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Oswald,
  Merriweather,
} from "next/font/google";

import "@/styles/grid.css";

// Add global styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "My App",
  description: "App description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${lato.variable} ${montserrat.variable} ${oswald.variable} ${merriweather.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
