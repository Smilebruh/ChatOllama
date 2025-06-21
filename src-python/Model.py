import ollama
import json

def isModelInstalled(model: str) -> bool:
    listModel: dict = ollama.list()
    return model in [modelName['model'] for modelName in listModel['models']]   

def runModel(model: str,messages: str) -> dict:
    if not isModelInstalled(model):
        try:
            ollama.pull(model)
        except ollama.ResponseError as err:
            print(f"\033[31mfailed to pull the model \033[0m: {err}")
            return
    messages = json.loads(messages)
    modelResponse: ollama.ChatResponse = ollama.chat(model=model, messages=messages['data'])
    return modelResponse.model_dump()