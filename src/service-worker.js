// get pledges from memeory
// if pledges dont exist then return
// generate string and to display in alert
// call alert
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab){
    if(changeInfo.url){
        const newUrl = new URL(changeInfo.url);
        const currentDomain = newUrl.hostname;
        const domainWithoutWWW = currentDomain.substring(currentDomain.indexOf(".")+1);
        const data = await chrome.storage.local.get(["entries"]);
        const entries = data['entries'];
        if (entries){
            if (domainWithoutWWW in entries){
                const message = entries[domainWithoutWWW].message;
                showNotification(message);
            }
        }  
    }
});
  
function showNotification(message) {
    chrome.notifications.create('', 
        {   title: 'Precommitment',
            message: `${message}`,
            iconUrl: '/5590.png',
            type: 'basic',
            priority: 2,
        },
        ()=> {
            console.log("Last error:", chrome.runtime.lastError);
        });
  
  }