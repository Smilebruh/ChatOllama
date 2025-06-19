import ollama

def check_model(model: str) -> bool:
    listModel: dict = ollama.list()
    return model in [modelName['model'] for modelName in listModel['models']]   