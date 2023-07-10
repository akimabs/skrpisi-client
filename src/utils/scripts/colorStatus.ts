import {colors} from 'src/themes/colors';

export const colorStatus = (status: TStatus): string => {
  if (status === 'APPROVE') {
    return colors.success_info;
  } else if (status === 'REJECTED') {
    return colors.danger;
  } else if (status === 'WAITING') {
    return colors.link;
  } else {
    return colors.dark;
  }
};
