import asyncio
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()
MODEL = os.getenv("LLM_MODEL")
APIKEY = os.getenv("LLM_API_KEY")
BASEURL = os.getenv("LLM_BASEURL")

class client:
    def __init__(self,model : str | None = None,apikey : str | None = None,baseurl : str | None = None):
        self.model = model or MODEL
        apikey = apikey or APIKEY
        baseurl = baseurl or BASEURL
        if not self.model or not apikey or not baseurl:
            raise ValueError("lack the message of model")
        self._client = AsyncOpenAI(
            api_key=apikey,
            base_url=baseurl,
            timeout=60
        )

    async def think(self,prompts : dict[str,str]):
        if not prompts.get("user") :
            raise ValueError("user prompt can't be NULL")
        if not self.model :
            raise ValueError("model can't be NULL")
        
        response = await self._client.responses.create(
            model=self.model,
            input=prompts["user"],
            instructions=prompts["system"] or None,
            stream=True,
            reasoning={
                "effort" : "high"
            },
            temperature=0.5
        )

        output : list[str] = []
        async for chunk in response:
            if chunk.type == "response.reasoning_text.delta":
                print(chunk.delta,end='')
            if chunk.type == "response.reasoning_text.done":
                print("\n\n")
            if chunk.type == "response.output_text.delta":
                output.append(chunk.delta)
                print(chunk.delta)
            if chunk.type == "response.completed":
                final_res = chunk.response
                usage = final_res.usage
                model = final_res.model
                status = final_res.status
                print("\n\n")
                print("统计：")
                print("模型配置:", model)
                print("响应状态:", status)
                print("用量:", usage)
            