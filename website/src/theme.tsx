import { LightTheme } from 'baseui';

const breakpoints: any = {
  small: 768,
  medium: 1025,
  large: 1366
};
const ResponsiveTheme = Object.keys(breakpoints).reduce(
  (acc: any, key) => {
    acc.mediaQuery[
      key
    ] = `@media screen and (min-width: ${breakpoints[key]}px)`; //
    return acc;
  },
  {
    breakpoints,
    mediaQuery: {}
  }
);

const MyTheme = { ...LightTheme, ...ResponsiveTheme };
export default MyTheme;
