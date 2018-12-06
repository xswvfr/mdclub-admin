import mdui, { JQ as $ } from 'mdui';
import actionsAbstract from '../../abstracts/actions/lazyComponent';

let global_actions;
let $searchbar;
let Menu;

export default $.extend({}, actionsAbstract, {
  /**
   * 初始化
   */
  init: props => (state, actions) => {
    global_actions = props.global_actions;
    $searchbar = $(props.element);

    const $bar = $searchbar.find('.bar');
    const $form = $searchbar.find('form');

    Menu = new mdui.Menu($bar, $form, {
      position: 'bottom',
      align: 'left',
      covered: false,
    });

    $form.on('open.mdui.menu', () => {
      $form.width($bar.width());
      $searchbar.addClass('is-open');
    });

    $form.on('close.mdui.menu', () => {
      $searchbar.removeClass('is-open');
    });
  },




});
