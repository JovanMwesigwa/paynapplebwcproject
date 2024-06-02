# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from mech_client.interact import interact, ConfirmationType

app = FastAPI()

class PromptRequest(BaseModel):
    prompt_text: str

@app.post("/prompt/")
async def generate_prompt(request: PromptRequest):
    try:
        print("Request received")
        result = interact(
            prompt=request.prompt_text,
            agent_id=2,  # Hardcoded agent_id
            tool="prediction-online",  # Hardcoded tool_name
            chain_config="celo",  # Hardcoded chain_config
            confirmation_type=ConfirmationType.ON_CHAIN,
            private_key_path="/Users/jovan/dev/bwc-hackathon/paynapple/packages/olas-agent/ethereum_private_key.txt"  # Hardcoded private_key_path
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
