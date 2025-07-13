# 🗨️ talk2page

A Chrome extension + AI backend that lets you **chat with any webpage** to understand its content, ask questions, and get context-aware answers.

Powered by FastAPI, Google Gemini, and LangChain.

---

## 🚀 Features

- Chat interface embedded on any webpage
- Uses full page HTML context + chat history for better answers
- FastAPI backend with structured AI responses
- LangChain integration for prompt templating
- Supports Gemini-2.0-flash (and can switch to other LLMs)
- Clean, lightweight frontend with history and scroll-to-bottom

---

## 🛠️ Tech Stack

- Chrome Extension (JavaScript + HTML + CSS)
- FastAPI (Python)
- LangChain
- Google Gemini LLM (via LangChain)
- BeautifulSoup for HTML text extraction
- CORS support for local dev

---

## 📦 Installation & Setup

### 1️⃣ Clone the repo

git clone https://github.com/Kkoderr/talk2page.git
cd talk2page

2️⃣ Install backend dependencies

pip install -r requirements.txt

3️⃣ Set up environment

Create a .env file:
GOOGLE_API_KEY=your_key_here

4️⃣ Run the FastAPI server

uvicorn main:app --reload
This starts the backend on http://127.0.0.1:8000.

5️⃣ Load the Chrome Extension

-Open chrome://extensions
-Enable Developer mode
-Click Load unpacked
-Select the chatbot_extension folder

---

💡 How it works
✅ The extension:
-Captures full page text (HTML → visible text)
-Collects chat history
-Sends data to FastAPI backend

✅ The backend:
-Cleans HTML using BeautifulSoup
-Builds a prompt with page content + chat history + user question
-Calls Gemini via LangChain to get a structured answer
-Returns JSON response

---

📄 Project structure:

talk2page/
├── chatbot_extension/     # Chrome extension frontend
│   ├── popup.html
│   ├── popup.js
│   └── ...
├── main.py               # FastAPI server entry point
├── chatbot.py            # AI logic & prompt
├── requirements.txt
└── README.md

---

📄 License:
This project is open source — feel free to fork and build on it!

---

⭐️ If you like this project
Give it a ⭐ on GitHub!


