"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Define static routes where the Navbar should be hidden
  const hiddenNavbarRoutes = ["/dashboard", "/datacatalog","/documentsummary"];

  // Regular expression to match dynamic routes like /[username]/dashboard
  const dynamicRouteRegex = /^\/[^/]+\/(dashboard|askanything|documentsummary|modeltraining|aiagent(?:\/(?:data-analytics|analytics-platform|devops|datacatalog|apitestingllm|conversationai))?)$/;

  // Check if the current path matches a static route or dynamic route
  const isNavbarHidden =
    hiddenNavbarRoutes.includes(pathname) || dynamicRouteRegex.test(pathname);

  // Conditionally render the Navbar
  if (isNavbarHidden) {
    return null;
  }

  return <Navigation />;
}