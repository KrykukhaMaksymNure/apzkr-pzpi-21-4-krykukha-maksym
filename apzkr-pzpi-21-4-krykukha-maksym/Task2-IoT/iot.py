import requests
import configuration

BASE_URL = configuration.get_base_url()
headers = {"localization": "uk",}

def create_new_iot():
    url = f"{BASE_URL}/iot/add"
    try:
        response = requests.post(url,headers=headers)
    except Exception as e:
        print("Bad Request")
    return response.content