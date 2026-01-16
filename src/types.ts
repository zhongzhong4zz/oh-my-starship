export const Themes = {
  Light: 'light',
  Dark: 'dark',
  System: 'system',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export interface Settings {
  theme: Theme;
  language: string;
}

export interface StarshipConfig {
  id: string;
  name: string;
  path: string;
  isEnterprise: boolean;
  createdAt: string;
  updatedAt: string;
}
