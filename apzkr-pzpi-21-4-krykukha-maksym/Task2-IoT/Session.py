import requests
import configuration

BASE_URL = configuration.get_base_url()

# Function to create a new session and return the session ID
def create_session(session_name, driver_id,watcher_id):
    data = {
        "sessionName":session_name,
        "driverId":driver_id,
        "watcherId":watcher_id
    }
    url = f"{BASE_URL}/session/add"
    response = requests.post(url, json=data)
    return(response.json()['id'])

# Function to update session status (enable/disable)
def update_session(status,session_id):
    data = {
        "isEnabled":status,
    }
    url = f"{BASE_URL}/session/{session_id}"
    try:
        response = requests.patch(url, json=data)
    except Exception as e:
        print("Error at updating session")

# Function to check if a session is enabled
def is_enabled_session(session):
    url = f"{BASE_URL}/session/{session}"
    response = requests.get(url)
    if (response.json()['isEnabled'] == "ENABLED"):
        return 'ENABLED'
    else:
        return 'DISABLED'

def end_session(session_id):
    update_session('DISABLED', session_id)