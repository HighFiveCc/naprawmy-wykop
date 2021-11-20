function getFeatures(currentUrl) {
  if (/wykop\.pl\/wiadomosc-prywatna/i.test(currentUrl)) {
    return ["bigger-field-messages", "link-edit-prompt-input"];
  }
  return [];
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    var features = getFeatures(tab.url);

    if (features.length == 0) {
      return;
    }

    features.forEach(function (feature) {
      chrome.scripting
        .executeScript({
          target: {
            tabId: tabId,
            allFrames: false,
          },
          files: [`./features/${feature}.js`],
        })
        .catch((err) => console.log(err));

      var s = document.createElement("script");
      s.src = chrome.runtime.getURL(`/features/${feature}.js`);
      s.onload = function () {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(s);
    });
  }
});
