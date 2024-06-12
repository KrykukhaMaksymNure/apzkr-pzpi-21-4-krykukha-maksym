import configuration
import requests

BASE_URL = configuration.get_base_url()

ALERT_IDS = []

def create_alert(watcher_id,driver_id):
    url = f"{BASE_URL}/alert/add"

    json_data = {
        "watcherId":watcher_id,
        "driverId":driver_id,
        "reason":""
    }
    try:
        response = requests.post(url,json=json_data)

        global ALERT_IDS
        ALERT_IDS.append(response.json()["id"])
        return ALERT_IDS

    except Exception as e:
        print("Occupied error at creating Alert")