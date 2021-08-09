import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  size?: 's' | 'm'
  children: ReactNode
  color?: 'red' | 'ghost' | 'green' | 'primary' | 'grey'
  href?: string
}