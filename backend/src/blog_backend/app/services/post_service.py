from ..data_seed import POSTS

def list_public_posts(skip:int = 0,limit:int | None = None):
    tmp = []
    for post in POSTS:
        if post.get("status") == "published":
            tmp.append(post)
    # 注意 python 里面切片索引越界不会报错
    limit = limit or len(tmp) 
    return tmp[skip:skip+limit]

def get_public_post(post_id : int):
    for post in POSTS:
        if post.get("id") == post_id:
            if post.get("status") == "published":
                return post
    return None