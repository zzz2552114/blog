from fastapi import APIRouter,Query
from ..services import post_service
from typing import Annotated

router = APIRouter(tags=["posts"],prefix="/api/v1/posts")

@router.get("/")
async def list_posts(skip:int = 0,limit: Annotated[int,Query(le=50)] = 10):
    return post_service.list_public_posts(skip,limit)

@router.get("/{post_id}")
async def get_post(post_id : int):
    return post_service.get_public_post(post_id)