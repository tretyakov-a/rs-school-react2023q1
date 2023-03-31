export const getAge = (birthday: string): number => {
  const bornDate = new Date(birthday);
  const ageDate = new Date(Date.now() - bornDate.getTime());
  const ageInYears = Math.abs(ageDate.getUTCFullYear() - 1970);
  return ageInYears;
};
