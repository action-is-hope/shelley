export const generateDataId = (
  dataId?: string,
  suffix?: string
): string | undefined => {
  return dataId && suffix ? `${dataId}--${suffix}` : undefined;
};
