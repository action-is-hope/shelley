declare const graphql: (query: TemplateStringsArray) => void;
declare module "*.st.css" {
  const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
  export default stylesheet;
}
