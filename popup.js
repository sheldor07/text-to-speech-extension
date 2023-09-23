let readBtn = document.getElementById("readTextButton");
let textArea = document.getElementById("textToRead");
function getText() {
  return document.body.innerText;
}

readBtn.addEventListener("click", () => {
  // Query for the active tab in the current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    // Execute the getText function in the context of the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        function: getText,
      },
      (result) => {
        // Handle the result here, e.g., read out the text
        console.log(result[0]?.result);
        textArea.innerText = result[0]?.result || "No text found";
      }
    );
  });
});
