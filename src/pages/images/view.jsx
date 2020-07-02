import { h } from 'hyperapp';
import cc from 'classcat';
import './index.less';

import Loading from '../../elements/loading';
import Empty from '../../elements/empty';
import Pswp from '../../elements/pswp';
import Pagination from '../../components/pagination/view';

export default (global_state, global_actions) => {
  const actions = global_actions.images;
  const state = global_state.images;

  const isEmpty = !state.loading && !state.data.length;
  const isLoading = state.loading;

  return ({ match }) => (
    <div
      oncreate={(element) => actions.init({ element, global_actions })}
      ondestroy={actions.destroy}
      key={match.url}
      id="page-images"
      class={cc([
        'mdui-container-fluid',
        {
          'checked-all': state.isCheckedAll,
          checked: state.checkedCount,
        },
      ])}
    >
      <div class="header">
        <div class="toggle-all" onclick={actions.checkAll}>
          <i class="mdui-icon material-icons">check_circle</i>
          <span>{state.data.length} 张图片</span>
        </div>
        <If condition={state.checkedCount}>
          <div class="actions">
            <button
              class="delete mdui-btn mdui-btn-icon mdui-btn-dense"
              mdui-tooltip={"{content: '批量删除', delay: 300}"}
              onclick={actions.batchDelete}
            >
              <i class="mdui-icon material-icons">delete</i>
            </button>
            <span class="mdui-float-right">
              已选择 {state.checkedCount} 张图片
            </span>
          </div>
        </If>
      </div>
      <div class="list">
        <div class="mdui-grid-list mdui-clearfix">
          <If condition={isLoading}>
            <Loading />
          </If>
          <If condition={isEmpty}>
            <Empty />
          </If>
          {state.data.map((item, index) => {
            const isChecked = state.isCheckedRows[item.hash];
            const thumbWidth = state.thumbData[index].width;
            const thumbHeight = state.thumbData[index].height;
            const thumbTransformX = 1 - 30 / state.thumbData[index].width;
            const thumbTransformY = 1 - 30 / state.thumbData[index].height;
            const thumbTransform = isChecked
              ? `translateZ(0px) scale3d(${thumbTransformX}, ${thumbTransformY}, 1)`
              : null;

            return (
              <div
                class={cc(['mdui-grid-tile', { checked: isChecked }])}
                style={{ height: `${thumbHeight}px`, width: `${thumbWidth}px` }}
              >
                <i
                  class="check-btn mdui-icon material-icons"
                  onclick={() => actions.checkOne(item.hash)}
                >
                  check_circle
                </i>
                <i
                  class="check-placeholder-btn mdui-icon material-icons"
                  onclick={() => actions.checkOne(item.hash)}
                >
                  radio_button_unchecked
                </i>
                <div
                  class="image"
                  style={{
                    backgroundImage: `url(${item.urls.r})`,
                    height: 0,
                    paddingBottom: `${thumbHeight}px`,
                    width: `${thumbWidth}px`,
                    transform: thumbTransform,
                  }}
                  onclick={(e) => actions.clickImage({ e, item, index })}
                >
                  <div
                    class={cc([
                      'overlay-top',
                      'mdui-grid-tile-actions',
                      'mdui-grid-tile-actions-top',
                      'mdui-grid-tile-actions-gradient',
                    ])}
                  ></div>
                  <div class="overlay-bottom mdui-grid-tile-actions mdui-grid-tile-actions-gradient">
                    <i
                      class="preview-btn mdui-icon material-icons"
                      onclick={() => actions.openImage({ item, index })}
                    >
                      zoom_in
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Pswp />
    </div>
  );
};