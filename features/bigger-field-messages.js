var feature = (function () {
  "use strict";

  return {
    init: function () {
      const wrapperH = document.querySelector("#site .wrapper").clientHeight;
      const pmContainerH = document.querySelector(".pmContainer").clientHeight;

      const $pmStreamView = document.querySelector(".pmStreamView");
      let pmStreamViewH = $pmStreamView.clientHeight;

      const offset = 15;
      const diff = wrapperH - pmContainerH;
      const newH = pmStreamViewH + diff - offset;

      $pmStreamView.style.minHeight = `${newH}px`;
    },
  };
})();

feature.init();
