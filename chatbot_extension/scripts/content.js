const get_ai_response = (user_input, chat_history)=>{
    const fullHTML = (document.body.innerText || document.body.textContent).replace(/\s+/g, ' ').trim();
    return new Promise((resolve, reject)=>{
        chrome.runtime.sendMessage({type:"FETCH_DATA", html: fullHTML, user_query: user_input, chat_history:chat_history}, response => {
            if(chrome.runtime.lastError){
                reject(chrome.runtime.lastError)
            }
            else{
                resolve(response)
            }
        });
    })
}

const scrollToBottom = ()=>{
    const container = document.getElementById("chat-container2")
    container.scrollTop = container.scrollHeight;
};

const appendChatBlock = (responder,chat)=>{
    const chat_container = document.getElementById('chat-container2')
    const chat_block = document.createElement('div')
    chat_block.className = `chat-box border border-black rounded-4 p-2 ${responder}`;
    chat_block.style.maxWidth = "90%";
    chat_block.style.wordWrap = "break-word";
    chat_block.style.backgroundColor = responder === "human" ? "#DCF8C6" : "#F1F0F0";
    chat_block.style.alignSelf = responder === "human" ? "flex-end" : "flex-start";
    chat_block.innerHTML = `<h5>${responder}</h5><p>${chat}</p>`;
    chat_container.appendChild(chat_block);
    scrollToBottom();
}

const observer = new MutationObserver(()=>{
    const form = document.getElementById("input-form");
    let chat_history = []
    if (form){
        form.addEventListener('submit', async (e)=>{
            e.preventDefault()
            const input = document.getElementById('query-box');
            const user_input = input.value.trim();
            if(user_input){
                appendChatBlock('human',user_input);
                input.value = "";
                scrollToBottom();
                const ai_response = await get_ai_response(user_input, chat_history)
                chat_history.push({responder:'USER',message:user_input})
                if(ai_response['error']) appendChatBlock("ai", ai_response.error)
                else{
                    chat_history.push({responder:'AI',message:ai_response.response})
                    appendChatBlock("ai",ai_response.response);
                }
            }
        })
        const minimize_btn = document.getElementById("minimize-btn")
        minimize_btn.addEventListener("click", (e)=>{
            const main_container = document.getElementById("main-container")
            console.log(main_container.style.visibility)
            if (main_container.style.visibility==='hidden'){
                main_container.style.visibility = 'visible';
            }else{
                main_container.style.visibility = 'hidden';
            }
        })
        const close_btn = document.getElementById("close-btn")
        close_btn.addEventListener("click",(e)=>{
            if (document.getElementById('bot-overlay')){
                document.getElementById("bot-overlay").remove();
            }
        })
        observer.disconnect();
    }
})


observer.observe(document.body, {childList:true, subtree:true})