document.getElementById('start').addEventListener('click',()=>{
    chrome.tabs.query({active:true, currentWindow:true},(tabs)=>{
        const tabId = tabs[0].id;

        chrome.scripting.executeScript({
            target:{tabId:tabId},
            files:['scripts/bot-overlay-content.js']
        })
    })
})

document.getElementById("stop").addEventListener("click",()=>{
    chrome.tabs.query({active:true},(tabs)=>{
        tabs.forEach((tab)=>{
            let tabId = tab.id;
            chrome.scripting.executeScript({
                target: {tabId:tabId},
                files:['scripts/rm-bot-content.js']
            })
        })
    })
})