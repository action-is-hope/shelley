const containerbase = {
  width: "100%",
  height: "100%",
  minHeight: "20vh",
  padding: "50px",
};

const containerCenter = {
  display: "flex",
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
