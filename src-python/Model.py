import ollama
from collections.abc import Generator

def isModelInstalled(model: str) -> bool:
    listModel = ollama.list()
    return model in [modelName['model'] for modelName in listModel['models']]   

def runModel(model: str,messages: str) -> Generator[str]:
    user_input: list[dict] = [{'role' : 'user' , 'content' : messages}]
    if not isModelInstalled(model):
        try: ollama.pull(model)

        except ollama.ResponseError as err:
            print(f"\033[31mfailed to pull the model \033[0m: {err}")
            return
        
    modelResponse: ollama.ChatResponse = ollama.chat(model=model, messages=user_input, stream=True)
    for chunk in modelResponse:
        print(chunk['message']['content'], flush=True)
        yield chunk['message']['content']