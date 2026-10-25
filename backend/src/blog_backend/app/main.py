from fastapi import FastAPI
from .router import health,posts
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(health.router)
app.include_router(posts.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500","http://localhost:5500","http://127.0.0.1:8000","http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




