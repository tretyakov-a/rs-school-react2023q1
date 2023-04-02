export interface InputProps {
  value?: string;
}

export interface CustomInputProps extends React.PropsWithChildren {
  type?: 'switch';
  label?: string;
  id?: string;
}

export interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}
