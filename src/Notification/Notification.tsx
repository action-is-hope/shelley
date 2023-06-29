import React, { useRef, RefObject, forwardRef } from "react";

import { st, classes } from "./notification.st.css";

function Notification() {
  return <div className={st(classes.root)}>Notification</div>;
}

/**
 * Notification displays various notifications.
 */
const _Notification = forwardRef(Notification);
export { _Notification as Notification };
