from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles


class Memo(BaseModel):
    id: str
    content: str
    
memos = []    

app = FastAPI()

# CORS 설정 추가
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/memos")
def create_memo(memo: Memo):
    memos.append(memo.dict())
    return "메모 추가 성공"

@app.get("/memos")
def read_memos():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content=req_memo.content
            return '성공했습니다'
    return '메모가 없습니다'

app.mount("/", StaticFiles(directory="static", html=True), name="static")
