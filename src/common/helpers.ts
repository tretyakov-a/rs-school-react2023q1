export const getAge = (birthday: string): number => {
  const bornDate = new Date(birthday);
  const ageDate = new Date(Date.now() - bornDate.getTime());
  const ageInYears = Math.abs(ageDate.getUTCFullYear() - 1970);
  return ageInYears;
};

export const cloneFile = (original: File): File => {
  return new File([original], original.name, {
    type: original.type,
    lastModified: original.lastModified,
  });
};

export const renderDate = (date: string, locales = 'en-US') => {
  return new Date(date).toLocaleString(locales, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
