import { Color } from '../styles/Color';

export type UiThemeMode = 'light' | 'dark';

export const APP_NAME = 'DALE Bridge';
export const APP_DESCRIPTION = 'Bridge tokens between Sepolia and DALE';
export const APP_URL = 'localhost:3000';
export const BRAND_COLOR = Color.primary['500'];

export const UI_THEME_STORAGE_KEY = 'warp-ui-theme';
export const DEFAULT_UI_THEME_MODE: UiThemeMode = 'light';
