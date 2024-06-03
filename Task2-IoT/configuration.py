import json

def get_base_url():
    try:
        with open("configuration.json", "r") as f:
            settings = json.load(f)
            return settings["BASE_URL"]

    except Exception as e:
        print("Invalid Request")

