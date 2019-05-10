export const bemPrefix = (classNamePrefix: string) => (
  className?: string,
  modificators?: Array<string | undefined> | string
): string => {
  const coreClass = className ? [classNamePrefix, className].join("__") : classNamePrefix;
  const classNames = [coreClass];
  const mods = Array.isArray(modificators) ? modificators : [modificators];

  if (mods.length) {
    mods.forEach(mod => mod && classNames.push(`${coreClass}--${mod}`));
  }

  return classNames.join(" ");
};
