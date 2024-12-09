import {
  createTheme,
  DEFAULT_THEME,
  type MantineBreakpointsValues,
  type MantineThemeColors,
} from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
});

/** Custom theme */

// export const colors: MantineThemeColors = DEFAULT_THEME.colors;
export const breakpoints: MantineBreakpointsValues = DEFAULT_THEME.breakpoints;

export const colors: MantineThemeColors = {
  ...DEFAULT_THEME.colors,
  'ocean-blue': [
    '#7AD1DD',
    '#5FCCDB',
    '#44CADC',
    '#2AC9DE',
    '#1AC2D9',
    '#11B7CD',
    '#09ADC3',
    '#0E99AC',
    '#128797',
    '#147885',
  ],
  'bright-pink': [
    '#F0BBDD',
    '#ED9BCF',
    '#EC7CC3',
    '#ED5DB8',
    '#F13EAF',
    '#F71FA7',
    '#FF00A1',
    '#E00890',
    '#C50E82',
    '#AD1374',
  ],
  'navy-blue': [
    '#1E1F26',
    '#1F2027',
    '#202129',
    '#21222B',
    '#22232D',
    '#23242F',
    '#242531',
    '#252633',
    '#262735',
    '#272837',
  ],
};
