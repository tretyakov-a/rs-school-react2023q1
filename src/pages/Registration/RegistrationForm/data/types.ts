export type RadioInputData = {
  label: string;
  name: string;
};

export const isRadioInputDataArray = (data: unknown): data is RadioInputData[] => {
  return Array.isArray(data) && data.every((item) => 'label' in item && 'name' in item);
};

export type SelectOptionData = {
  option: string;
};

export const isOptionsDataArray = (data: unknown): data is SelectOptionData[] => {
  return Array.isArray(data) && data.every((item) => 'option' in item);
};
