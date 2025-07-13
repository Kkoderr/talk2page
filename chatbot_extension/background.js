chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    if(msg.type == 'FETCH_DATA'){
        (async()=>{
            try{
                let htmlData = msg.html;
                let query = msg.user_query;
                let history = msg.chat_history;
//                console.log(htmlData);
                const response = await fetch("http://127.0.0.1:8000/chatResponses",{
                    method:'POST',
                    headers:{'Content-Type':"application/json"},
                    body: JSON.stringify({htmlData,query,history})
                });
                const data = await response.json();
                if(data['error']) console.log(data.error)
                console.log(data.response)
                sendResponse(data);
            }catch(err){
                console.error("Fetch Error", err);
                sendResponse({error: err.message});
            }
        })();
        return true;
    }
});