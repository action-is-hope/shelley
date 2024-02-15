const fs = require("fs");

// Load the TypeDoc generated JSON file
const typedocJson = require("../docs/docs.json");
const convertCommentsToMarkdown = require("./doc-helpers");

const packagePattern = /node_modules\/(@[^\/]+\/[^\/]+)/;

function getSourcePackage(prop) {
  const fileName = prop?.sources?.[0]?.fileName;

  // Check if the string starts with "React"

  if (
    fileName.startsWith("node_modules/@react-types/") ||
    fileName.startsWith("node_modules/@react-aria/")
  ) {
    return fileName.match(packagePattern)[1];
  } else if (fileName?.startsWith("node_modules/@types/react/")) {
    // return fileName.match(packagePattern)[1];
    return "IGNORE";
  } else if (fileName?.startsWith("src/")) {
    return "@actionishope/@shelley";
  } else {
    return fileName.match(packagePattern)[1];
  }
  // return null; // Return null if the conditions are not met
}

function formatProp(prop) {
  if (!prop.flags?.isOptional) {
    console.log("isRequired", prop.flags?.isOptional, prop.name);
  }

  return {
    name: prop.name,
    description:
      prop.comment?.summary && convertCommentsToMarkdown(prop.comment.summary),
    type: prop.type?.name,
    source: prop.sources[0].fileName.match(packagePattern)?.[1],
    required: !prop.flags?.isOptional ? true : false,
  };
}

function groupAndSplitPropsBySource(props) {
  if (!Array.isArray(props)) {
    return { propsMap: {} };
  }

  const libraryProps = []; // Props defined within the library
  const propsMap = {}; // Object to hold extended props grouped by source

  props.forEach((prop) => {
    // if (!prop.flags?.isExternal) {
    //   libraryProps.push(formatProp(prop));
    // } else

    if (prop.sources) {
      const sourcePackage = getSourcePackage(prop) || "Unknown Source";
      if (sourcePackage === "IGNORE") {
        return;
      }
      if (!propsMap[sourcePackage]) {
        propsMap[sourcePackage] = [];
      }
      propsMap[sourcePackage].push(formatProp(prop));
    } else if (prop.inheritedFrom) {
      console.log("inheritedFrom");
    } else {
      // Fallback for unclassified props
      if (!propsMap["Unclassified"]) {
        propsMap["Unclassified"] = [];
      }
      propsMap["Unclassified"].push(prop.name);
    }
  });

  return propsMap;
}

function findRefType(types) {
  let result = null;
  // Search for "RefAttributes" and "ref" entries in the types array
  const refEntry = types.find(
    (type) =>
      type.name === "RefAttributes" ||
      type?.declaration?.children[0]?.name === "ref"
  );

  if (refEntry?.name === "RefAttributes") {
    const refType = refEntry?.typeArguments?.[0];
    result =
      refType.type === "union"
        ? {
            type: refType.type,
            types: refType.types,
          }
        : {
            type: refType.type,
            name: refType.name,
            package: refType.package,
          };
    // Deals with tthe casting of ComboboxMultiSelect
  } else if (refEntry?.declaration?.children[0]?.name === "ref") {
    const refType = refEntry?.declaration?.children[0];
    result = {
      type: refType.type.typeArguments[0].type,
      types: refType.type.typeArguments[0].types,
    };
  }
  return result;
}

function extractInterface(types) {
  // console.log("typestypestypes", types);
  if (types[0] === undefined) {
    return [];
  }
  // Filter types by the specified package name
  const filteredTypes = types.filter(
    (type) =>
      type.type === "reference" &&
      type.name !== "RefAttributes" &&
      type.name !== "Omit"
  );

  // Map the filtered types to an array of their names and package
  let tsInterface = filteredTypes.map((type) => ({
    interface: {
      name: type.name,
      package: type.package,
      target: type.target,
      // Extract the typeArguments if they exist and are relevant
      typeArguments: type.typeArguments?.map((arg) => arg.name) || [],
    },
  }));

  if (tsInterface.length > 1) {
    console.log("More than one tsInterface:", tsInterface);
  }

  // Find the interfaceTarget in the TypeDoc JSON
  const interfaceTarget = typedocJson.children.find(
    (child) => child.id === tsInterface[0].interface.target
  );
  // Define the interfaceProps array
  let interfaceProps = [];
  // Check if the interfaceTarget exists else
  if (interfaceTarget) {
    // If the interfaceTarget has children, use them as the interfaceProps
    if (interfaceTarget?.children) {
      interfaceProps = interfaceTarget?.children;
    } else {
      if (interfaceTarget?.type?.typeArguments?.[1]?.type === "union") {
        console.log("Union found", interfaceTarget?.name);
      } else if (interfaceTarget?.type?.name === "Omit") {
        const omitInterfaceTarget = typedocJson.children.find(
          (child) => child.id === interfaceTarget?.type?.typeArguments[0].target
        );
        // @todo extend for multiple omits...
        const omitValue = interfaceTarget?.type?.typeArguments[1].value;
        const filteredArray = omitInterfaceTarget.children.filter(
          (item) => item.name !== omitValue
        );
        interfaceProps = filteredArray;
      }
    }
  } else {
    console.log("No interfaceTarget found for", types?.[0]?.name);
  }

  const propsMap = groupAndSplitPropsBySource(interfaceProps);

  tsInterface[0].propsMap = propsMap;

  return tsInterface;
}

// Function to process and extract component props
function extractComponentData(data) {
  const components = data.children.filter((child) => {
    return child.variant === "declaration" && child?.signatures;
  });

  const componentsData = components.map((component) => {
    const parameters = component.signatures[0]?.parameters?.[0];

    const ref =
      parameters?.type?.type === "intersection" &&
      findRefType(parameters?.type?.types);

    if (parameters?.type === undefined) {
      console.log(component);
    }

    const componentInterface =
      parameters?.type?.type === "intersection"
        ? extractInterface(parameters?.type?.types)
        : extractInterface([parameters?.type]);

    const description = component.signatures[0]?.comment?.summary;
    return {
      name: component.name,
      fileName: component.sources[0]?.fileName,
      description: description && convertCommentsToMarkdown(description),
      interface: componentInterface[0]?.interface,
      params: {
        ref: ref,
        props: componentInterface[0]?.propsMap,
      },
    };
  });

  return componentsData;
}

// Process the data
const componentsData = extractComponentData(typedocJson);

// Saving the processed data to a file
const filePath = "./extractedProps.json";
fs.writeFileSync(filePath, JSON.stringify(componentsData, null, 2), "utf8");
// console.log("Processed props data:", componentsData);
console.log(`Processed props data has been saved to ${filePath}`);
