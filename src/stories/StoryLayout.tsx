const containerbase = {
  width: "100%",
  height: "100%",
  minHeight: "20vh",
  padding: "50px",
};

const containerCenter = {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
};

const contentInlineCentered = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

export const StoryCentered = (props: any) => (
  <div style={{ ...containerbase, ...containerCenter, ...props.style }}>
    {props.children}
  </div>
);

export const StoryCenteredInline = (props: any) => (
  <div style={{ ...containerbase, ...containerCenter }}>
    <div style={{ ...contentInlineCentered }}>{props.children}</div>
  </div>
);

export const StoryCenteredColumn = (props: any) => (
  <div style={{ ...containerbase, ...containerCenter }}>
    <div style={{ ...contentInlineCentered, flexDirection: "column" }}>
      {props.children}
    </div>
  </div>
);

export const StoryGrid = (props: any) => (
  <div
    style={{
      ...containerbase,
      ...containerCenter,
      justifyContent: props.justifyContent,
    }}
  >
    <div
      style={{
        display: "grid",
        gap: props.gap || "24px",
        gridTemplateColumns: props.cols || undefined,
        ...props,
      }}
    >
      {props.children}
    </div>
  </div>
);

export const StoryGridV2 = (props: any) => (
  <div
    style={{
      ...containerbase,
      ...containerCenter,
      justifyContent: props.justifyContent,
    }}
  >
    <div
      style={{
        display: "grid",
        gap: props.gap || "24px",
        gridTemplateColumns: props.cols || undefined,
        ...props,
      }}
    >
      {props.children}
    </div>
  </div>
);
