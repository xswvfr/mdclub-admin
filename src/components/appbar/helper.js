import { JQ as $ } from 'mdui';

const $body = $('body');

/**
 * 反转主题颜色
 * @param  theme
 * @return string
 */
const themeReverse = theme => theme === 'light' ? 'dark' : 'light';

/**
 * 设置主题颜色
 * @param theme
 */
const setTheme = (theme) => {
  $body.removeClass(`mdui-theme-layout-${themeReverse(theme)}`);
  $body.addClass(`mdui-theme-layout-${theme}`);
};

export {
  themeReverse,
  setTheme,
};