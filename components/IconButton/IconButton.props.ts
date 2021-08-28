import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './up.svg'
import close from './closebig.svg'
import menu from './menu.svg'

export const icons = {
  up,
  close,
  menu
}

export type Iconname = keyof typeof icons

export interface IconButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'white',
  icon: Iconname
}