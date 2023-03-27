export interface InputProps {
  inputRef: React.RefObject<HTMLElement> | null;
  value?: string;
  label?: string;
}

export interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}
