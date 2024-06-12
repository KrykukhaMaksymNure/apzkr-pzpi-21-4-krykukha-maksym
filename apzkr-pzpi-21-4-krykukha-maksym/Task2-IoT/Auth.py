from datetime import datetime
import requests
import configuration

# Base URL for the API endpoint
BASE_URL = configuration.get_base_url()
# Headers for localization
headers = {"localization": "uk",}

# Function to authenticate the driver and return the response
def authenticate_driver(iot) -> str:
    url = f"{BASE_URL}/auth/driver_login"
    try:
        email = input("Enter your email: ")
        phone = input("Enter your phone: ")
        driverName = input("Enter your name: ")
        driverSurname = input("Enter your surname: ")
        password = input("Enter your password: ")

        # Authentication data for driver and driver
        auth_data_driver = {}
        auth_data_driver["email"] = email
        auth_data_driver["phone"] = phone
        auth_data_driver["driverName"] = driverName
        auth_data_driver["driverSurname"] = driverSurname
        auth_data_driver["password"] = password
        # Send POST request for driver authentication
        response = requests.post(url, headers=headers, json=auth_data_driver)
    except Exception as e :
        print("Error at authentication")
    return(response)



# Get driver ID from authentication response
def get_driver_id(iot):
    response = authenticate_driver(iot)

    global driver_id
    driver_id = (response.json()['driver']['id'])
    print("Driver", driver_id)

    return driver_id

def get_not_taken_watchers():
    url = f'{BASE_URL}/watcher/not-taken'

    try:
        response = requests.get(url)
        return response.json()["id"]
    except Exception as e:
        print("Error occupied finding not taken Watcher")


#Get watcher id after binding watcher to driver
def get_watcher_id():
    watcher_id = get_not_taken_watchers()

    data_binding_watcher_to_driver = {
        "watcherId" : watcher_id,
        "driverId" : driver_id
    }

    url = f'{BASE_URL}/driver/add-watcher'

    try:
        response = requests.post(url,json=data_binding_watcher_to_driver)
        return watcher_id
    except Exception as e:
        print("Error occupied at binding watcher")