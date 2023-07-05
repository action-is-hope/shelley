import { classes } from "@stylable/runtime";

type StyleModule = { styles: Record<string, string> };

export async function loadStyles(
  stylePackages: string[],
  stylePaths: string[]
): Promise<StyleModule[]> {
  const styles: StyleModule[] = [];

  for (const stylePackage of stylePackages) {
    const styleModule = await import(stylePackage);
    styles.push(styleModule.default);
  }

  for (const stylePath of stylePaths) {
    const { default: styleModule } = await import(stylePath);
    styles.push(styleModule);
  }

  return styles;
}

export function applyStyles(
  styles: StyleModule[],
  props: Record<string, unknown>
): string {
  const classNames = styles.map(
    (style) => classes(style.styles, props).className
  );
  return classNames.join(" ");
}
