import Auth
import Session
import Heartbeat
import iot

def main():
    try:
        # create iot device
        new_iot = iot.create_new_iot()

        # Get driver and watcher IDs
        DRIVER_ID = Auth.get_driver_id(new_iot)
        WATCHER_ID = Auth.get_watcher_id()

        #Create session id and create posting heartbeat
        SESSION_ID = Session.create_session("testing",DRIVER_ID,WATCHER_ID)
        Heartbeat.send_heartbeats(SESSION_ID,WATCHER_ID,DRIVER_ID)

    except Exception as e:
        Session.end_session(SESSION_ID)
if __name__ == "__main__":
    main()