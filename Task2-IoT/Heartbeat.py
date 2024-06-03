import random
from datetime import datetime
import time
import requests
import Session
import configuration
import Alert

ALERTS = []
BASE_URL = configuration.get_base_url()
MAX_RANDOM_OFFSET = 0.5
RAND_RANGE = 11
SLEEP_TIME = 1

# Function to simulate and send heartbeats for a session
def make_heartbeats():
    global heart_beats
    heart_beats = 75

    rand_num = MAX_RANDOM_OFFSET - (random.randint(0, RAND_RANGE) / 10)
    heart_beats += rand_num
    return heart_beats

def check_heartbeats(heartbeats):
    if heartbeats <60:
        return 'LOW'
    elif heartbeats > 60 and heartbeats < 100:
        return 'NORMAL'
    else:
        return 'HIGH'

def send_heartbeats(session_id,watcher_id,driver_id):
    while True:
        try:
            # Check if session is enabled
            if (Session.is_enabled_session(session=session_id)== "DISABLED"):
                print(session_id, "is disabled")
            heartbeat_now = make_heartbeats()
            json_data = {
                "count": heartbeat_now,
                "sessionId":session_id,
                "driverId":driver_id,
                "watcherId":watcher_id
            }

            # Check heartbeat of Driver at the this moment
            check_heartbeat = check_heartbeats(heartbeat_now)

            # If heartbeat is dangerous alert is created
            if check_heartbeat == "LOW" or check_heartbeat == "HIGH":
                global ALERTS
                ALERTS = Alert.create_alert(watcher_id=watcher_id,driver_id=driver_id)

            # Send POST request to add heartbeat
            url = f"{BASE_URL}/heartbeat/add"
            response = requests.post(url, json=json_data)

            # Print the data about driver
            now = datetime.now()
            current_time = now.strftime("%H:%M:%S")
            print(f"[ {current_time} ]",response.json()['count'], ":",response.json()['description']," heartbeat")
            print(f"[ {current_time} ] Alerts:", len(ALERTS), ALERTS)
            time.sleep(SLEEP_TIME)

        except Exception as e:
            time.sleep(SLEEP_TIME)