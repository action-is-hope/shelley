import { useId } from "react-aria";

export interface ComponentDocs {
  displayName: string;
  description: string;
  filePath: string;
  methods: unknown[];
  props: PropRow[];
  tags: any;
}

export interface PropRow {
  id: number;
  name: string;
  description: string;
  type: {
    name: string;
  };
  defaultValue: string;
  parent: {
    name: string;
    fileName: string;
  };
  required: boolean;
}

export interface PropRowDisplay {
  id: string;
  name: string;
  description: string;
  type: string;
  defaultValue: string;
  required: string;
}

export const componentMetaDataReducer = (componentMetaData: PropRow[]) => {
  const keys = Object.keys(componentMetaData) as Array<
    keyof typeof componentMetaData
  >;

  const result = keys.reduce(
    (
      acc: { [key: string]: { props: PropRowDisplay[]; fileName: string } },
      key
    ) => {
      const prop = componentMetaData[key] as PropRow;

      if (prop.parent?.name) {
        if (!acc[prop.parent.name]) {
          acc[prop.parent.name] = {
            props: [],
            fileName: prop.parent.fileName,
          };
        }
        acc[prop.parent.name]?.props.push({
          id: useId(),
          name: prop?.name,
          description: prop?.description,
          defaultValue: prop?.defaultValue,
          type: prop?.type ? prop.type.name : "",
          required: prop?.required ? "required" : "optional",
        });
      }

      return acc;
    },
    {}
  );
  return result;
};
