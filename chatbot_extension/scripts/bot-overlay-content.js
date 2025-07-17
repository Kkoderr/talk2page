if (!document.getElementById("bot-overlay")) {

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('styles/custom_style.css');
    document.head.appendChild(style);

    const style2 = document.createElement('link');
    style2.rel = 'stylesheet';
    style2.href = chrome.runtime.getURL('styles/bootstrap.min.css');
    document.head.appendChild(style2);

    const container = document.createElement("div");
    container.id = "bot-overlay";
    container.className = "container w-75";
    container.style.position = "fixed";
    container.style.top = "50px";
    container.style.left = "30px";
    container.style.maxWidth = "600px";
    container.style.zIndex = "9999";
    url = new URL(window.location.href);
    const parts = url.hostname.split('.');
    let website = parts[0];
    if (parts[0] === 'www') website = parts[1];
    website = website[0].toUpperCase() + website.slice(1);


    img_src = chrome.runtime.getURL("images/minimize.png");

    const availableHeight = window.innerHeight - 200;

    container.innerHTML = `
    <div style='margin-bottom: 3px;'>
        <button id="minimize-btn" class="btn btn-sm btn-light p-1 rounded-circle"><img src="${img_src}" width="20" /></button>
    </div>
    <br>
    <div id="main-container" class="chat border border-dark rounded-3 p-3 h-50 bg-white bg-opacity-75 text-black" style = 'max-height: ${availableHeight}px; overflow-y: auto; width: 100%;'>
        <div class="d-flex justify-content-between align-items-center mb-2" style='position:sticky;' id="header">
            <h3 class="m-0" id='window-title'>${website}'s Bot</h3>
            <button id="close-btn" class="btn btn-sm btn-dark p-1 bg-transparent btn-close"></button>
        </div>
        <div class="d-flex flex-column gap-4 " id="chat-container2">
            <div class="chat-box w-50 border border-black rounded-4 p-2 ai">
                <h5>Bot</h5>
                <p>Hello ask me anything about the page.</p>
            </div>
        </div>
        <div>
            <form id="input-form" >
                <div class="d-flex mt-4">
                    <input placeholder="Ask Anything" type="text" class="form-control rounded-end-0" id="query-box" autocomplete='off'>
                    <button class="btn btn-primary rounded-start-0 " type="submit" id="send-btn">Go</button>
                </div>
            </form>
        </div>
    </div>`;
    document.body.appendChild(container);
}
