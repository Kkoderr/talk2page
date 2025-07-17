const get_ai_response = (user_input, chat_history)=>{
    const fullHTML = (document.body?.innerText || document.body?.textContent || '').replace(/\s+/g, ' ').trim();
    return new Promise((resolve, reject)=>{
        chrome.runtime.sendMessage({type:"FETCH_DATA", html: fullHTML, user_query: user_input, chat_history:chat_history}, response => {
            if(chrome.runtime.lastError){
                reject(chrome.runtime.lastError);
            }
            else{
                resolve(response);
            }
        });
    });
}

const scrollToBottom = ()=>{
    const container = document.getElementById("chat-container2")
    container.scrollTop = container.scrollHeight;
};

const appendChatBlock = (responder,chat)=>{
    const formatted_chat = chat.replace(/\n/g, '<br>');
    const chat_container = document.getElementById('chat-container2')
    const chat_block = document.createElement('div')

    chat_block.className = `chat-box border border-black rounded-4 p-2 ${responder=='User'?'human':'ai'}`;
    chat_block.style.maxWidth = "90%";
    chat_block.style.wordWrap = "break-word";
    chat_block.style.backgroundColor = responder === "User" ? "#DCF8C6" : "#F1F0F0";
    chat_block.style.alignSelf = responder === "User" ? "flex-end" : "flex-start";
    chat_block.innerHTML = `<h5>${responder}</h5><p>${formatted_chat}</p>`;
    chat_container.appendChild(chat_block);
    scrollToBottom();
}

const add_processing_animation = ()=>{
    const chat_container = document.getElementById('chat-container2');
    if(!chat_container) return;
    const loading = document.createElement('div');
    loading.id = 'loading-indicator';
    loading.innerText = 'Generating Response...';
    loading.style.fontStyle = 'italic';
    loading.style.alignSelf = 'flex-start';
    chat_container.appendChild(loading);
    scrollToBottom();
}

const rem_processing_animation = ()=>{
    const loading = document.getElementById('loading-indicator');
    if(loading) loading.remove();
};

const observer = new MutationObserver(()=>{
    const form = document.getElementById("input-form");
    let chat_history = [];
    if (form && !form.dataset.listenerAdded){
        form.addEventListener('submit', async (e)=>{
            e.preventDefault()
            const input = document.getElementById('query-box');
            const user_input = input.value.trim();
            if(user_input){
                appendChatBlock('User',user_input);
                input.value = "";
                scrollToBottom();
                try{
                    add_processing_animation();
                    const ai_response = await get_ai_response(user_input, chat_history.slice(-10));
                    rem_processing_animation();
                    chat_history.push({responder:'USER',message:user_input})
                    if(ai_response['error']) appendChatBlock("Bot", ai_response.error)
                    else{
                        chat_history.push({responder:'AI',message:ai_response.response})
                        appendChatBlock("Bot",ai_response.response);
                    }
                }catch(e){
                    rem_processing_animation();
                    console.error(e);
                    appendChatBlock('Bot', "Failed to get response!")
                }
            }
        });
        form.dataset.listenerAdded = 'true';
    };
    const minimize_btn = document.getElementById("minimize-btn");
    if(minimize_btn && !minimize_btn.dataset.listenerAdded){
        minimize_btn.addEventListener("click", (e)=>{
            const main_container = document.getElementById("main-container")
            console.log(main_container.style.visibility)
            if (main_container.style.visibility==='hidden'){
                main_container.style.visibility = 'visible';
            }else{
                main_container.style.visibility = 'hidden';
            }
        })
        minimize_btn.dataset.listenerAdded = 'true';
    };
    const close_btn = document.getElementById("close-btn");
    if(close_btn && !close_btn.dataset.listenerAdded ){
        close_btn.addEventListener("click",()=>{
            if (document.getElementById('bot-overlay')){
                document.getElementById("bot-overlay").remove();
            }
        });
        close_btn.dataset.listenerAdded = true;
    };
})

observer.observe(document.body, {childList:true, subtree:true});