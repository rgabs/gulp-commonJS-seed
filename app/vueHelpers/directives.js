'use strict';

Vue.directive('linkto', { //for input type text and checkbox
  update(domLinkedTo) {
    const $domLinkedTo = $(`#${domLinkedTo}`);
    const dom = this.el;
    switch (this.el.type) {
      case 'number':
      case 'text':
        if ($domLinkedTo.val()) {
          $(dom).val($domLinkedTo.val());
        }
        $(dom).on('input', () => {
          $domLinkedTo.val($(dom).val());
        });
        break;

      case 'password':
        if ($domLinkedTo.val()) {
          $(dom).val($domLinkedTo.val());
        }
        $(dom).on('input', () => {
          $domLinkedTo.val($(dom).val());
        });
        break;
      case 'checkbox':
        if ($domLinkedTo.is(':checked')) {
          $(dom).prop('checked', true);
        }
        $(dom).on('click', () => {
          $domLinkedTo.prop('checked', $(dom).is(':checked'));
        });
        break;
      case 'button':
        $(dom).click(() => {
          $domLinkedTo.trigger('click');
          return 0;
        })
        break;
      default:
        break;
    }
  },
  unbind() {
    $(this.el).unbind();
  }
});

Vue.directive('linkSelect', { //for input type list and watch on select tag
  params: ['link'],
  update({
    linkedTo = ''
  }) {
    const dom = this.el;
    const $dom = $(dom);
    const $linkedDom = $(`#${linkedTo}`);
    if ($linkedDom.val()) { //set initial value
      const selectVal = $linkedDom.find('option:selected').text();
      $dom.val(selectVal);
      window.VueInstance.$dispatch('TA_LOADED', {
        'confirmitDomID': $linkedDom.attr('id').split('TAB')[1].split('_'), //index 0: brandindex, 1: TAindex
        'customDom': dom,
        'confirmitVal': selectVal
      });
    }
  }
});

Vue.directive('replaceWith', {
  update: function(dom) {
    $(this.el).replaceWith($(dom).css({
      'visibility': 'visible'
    }));
  }
})
