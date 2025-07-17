from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import List, Literal
from dotenv import load_dotenv
from chatbot import chatAI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Response(BaseModel):
    responder: Literal['AI', 'USER']
    message: str

class Input(BaseModel):
    htmlData : str = Field(..., description = "The HTML for a webpage , that will be used as context")
    query: str = Field(..., description = "The users query")
    history: List[Response] = Field(..., description = "The current chat history regarding this page.")

@app.get("/")
def home():
    return JSONResponse(status_code=200, content={"API_message": "Welcome To the API"})

@app.post('/chatResponses')
async def chat_responses(input_data: Input):
    try:
        input_data_dict = input_data.model_dump()
        ai_response = await chatAI(input_data_dict)
        print(ai_response)
        if ai_response.error:
            return JSONResponse(status_code=400, content={"error": ai_response.error})
        return JSONResponse(status_code=200, content=ai_response.model_dump())
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


