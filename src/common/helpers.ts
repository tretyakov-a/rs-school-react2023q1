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

export const addCommasToString = (str: string) => {
  let result = '';
  let counter = 0;
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result = str[i] + (counter === 3 ? ',' : '') + result;
    counter += 1;
    if (counter > 3) counter = 1;
  }
  return result;
};

export const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
