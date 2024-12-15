"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Define routes where the Navbar should be hidden
  const hiddenNavbarRoutes = ["/dashboard",'/datacatalog'];

  // Conditionally render the Navbar
  if (hiddenNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navigation />;
}