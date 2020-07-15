declare const graphql: (query: TemplateStringsArray) => void;
// See: https://www.npmjs.com/package/@stylable/runtime#typescript-integration
declare module "*.st.css" {
  const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
  export default stylesheet;
}
declare module "react-expanding-textarea";
