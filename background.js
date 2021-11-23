function getFeatures(currentUrl) {
  if (/wykop\.pl\/wiadomosc-prywatna/i.test(currentUrl)) {
    return ["bigger-field-messages"];
  }

  const globalFeatures = ["link-edit-prompt-input","floating-video"];
  return globalFeatures;
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
    });
  }
});
