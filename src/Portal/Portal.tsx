"use client";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

// Define the type for the component's props
interface PortalProps {
  // Accept any valid React child (element, string, etc.)
  children: ReactNode;
  // Optional selector string for the portal target element
  selector?: string | false;
}

/**
 * Portal are for rendering content outside of the normal DOM hierarchy.
 */
export function Portal(props: PortalProps) {
  const { children, selector } = props;
  // Attempt to find the portal target element if a selector is provided
  const portalElement = selector ? document.querySelector(selector) : null;

  if (selector && portalElement) {
    // If a valid portal target is found, render the children into that element.
    return createPortal(children, portalElement);
  } else if (selector) {
    // Handle the case where the portal target is not found
    console.warn("Portal target element not found:", selector);
  }

  // Default case: render children inline if no selector is provided or target element not found.
  return <>{children}</>;
}

Portal.displayName = "Portal";
