var feature = (function () {
  const DATA_VISIBLE_ATTR = "data-visible";

  function isElementInViewport($element) {
    var rect = $element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function onVisibilityChange($element, invisibleCallback) {
    var prevVisibility = $element.getAttribute(DATA_VISIBLE_ATTR);

    if (prevVisibility === null) {
      prevVisibility = false;
    } else {
      prevVisibility = Boolean(prevVisibility);
    }

    var currentVisibity = isElementInViewport($element);

    if (currentVisibity != prevVisibility) {
      $element.setAttribute(DATA_VISIBLE_ATTR, currentVisibity);

      if (!currentVisibity) {
        invisibleCallback();
      }
    }
  }

  function getCloseButton($player) {
    return $player.parentElement.parentElement.querySelector("a");
  }

  function getAllVideoPlayers() {
    return document.querySelectorAll('.youtube-player, iframe[id^="streamable-"]');
  }

  function resetAllVideoPlayers() {
    getAllVideoPlayers().forEach(function ($player) {
      getCloseButton($player).click();
    });
  }

  return {
    init: function () {
      let $previewVideoLinks = document.querySelectorAll(
        '.video a[data-open="1"]'
      );
      $previewVideoLinks.forEach(function ($el) {
        $el.addEventListener("click", resetAllVideoPlayers);
      });

      window.addEventListener("scroll", function () {
        getAllVideoPlayers().forEach(function ($videoPlayer) {
          onVisibilityChange($videoPlayer, function () {
            function makeFloatVideo($player) {
              $player.setAttribute(
                "style",
                "position: fixed; top: 75%; left: 81%; width: 320px; height: 190px; z-index: 100000"
              );
            }

            function moveCloseButtonOnTheTopOfTheVideo($player) {
              getCloseButton($player).setAttribute(
                "style",
                "position: fixed; top: 74%; left: 80%; z-index: 100001"
              );
            }

            function resetAllVideoPlayersWithoutCurrent($videoPlayer) {
              getAllVideoPlayers().forEach(function ($player) {
                if ($videoPlayer != $player) {
                  getCloseButton($player).click();
                }
              });
            }

            makeFloatVideo($videoPlayer);
            moveCloseButtonOnTheTopOfTheVideo($videoPlayer);
            resetAllVideoPlayersWithoutCurrent($videoPlayer);
          });
        });
      });
    },
  };
})();

feature.init();
