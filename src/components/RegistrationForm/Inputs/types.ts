export interface InputProps {
  value?: string;
  label?: string;
}

export interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  ref: React.RefObject<HTMLInputElement>;
}
