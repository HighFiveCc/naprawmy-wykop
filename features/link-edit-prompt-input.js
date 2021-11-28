var feature = (function () {
  const OPIS_ODNOSNIKA = "opis odnośnika";

  function editLinkClickEvent() {
    setTimeout(function () {
      let url = prompt("Wklej link");

      if (!isUrlIsValid(url)) {
        return;
      }

      var $textarea = document.querySelector(".arrow_box textarea");
      $textarea.focus();

      $textarea.value = getReplacedText($textarea.value, url);

      const range = {
        getStart: function () {
          return $textarea.value.indexOf(`[${OPIS_ODNOSNIKA}]`) + 1;
        },
        getEnd: function () {
          return this.getStart() + OPIS_ODNOSNIKA.length;
        },
      };

      $textarea.setSelectionRange(range.getStart(), range.getEnd());
    }, 1);

    function getReplacedText(text, url) {
      return text.replace(/(https*:\/\/www\.wykop\.pl)/, url);
    }

    function isUrlIsValid(url) {
      return url !== null && url !== "";
    }
  }
  return {
    init: function () {
      var $editLink = document.querySelector(".editlink");
      if ($editLink === undefined) {
        return;
      }
      $editLink.addEventListener("click", editLinkClickEvent);
    },
  };
})();

feature.init();
