
import Navigation from "./components/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import NavigationWrapper from "./components/NavigationWrapper";
import { AuthProvider } from "./AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lake front AI",
  description: "For Lake front AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavigationWrapper />
        
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}