
# West-MEC NE OpenHouse/Map
A map of the West-Mec NE campus with information on the programs and any active events for them.


## Documentation


### Map functionality

Experience folder contains all the middleware and modules used to run the map/ThreeJS
Map Materials models and textures are contained in the public folder



### Changing Program/Teacher Info

teacher and program information is in the file
- src/modules/ProgramInfo.json

(
    do not change the order of the programs
    doing so will affect which checkbox connects to what program in the admin page
)

### Changing the POW(Program of Work)
The POW is found in the public/assets folder
when changing the POW, keep the name the same as prior to change, or also change it in the ProgramInfo.json


### BACKEND

Backend routers, modules, and models are named to be as direct as possible.

#### USER Module/Router

Handles the participants and visitors and allows you to keep track of them via email/name

#### EVENT Module/Router

Handles the creation, editing, removal, and ending of events.

the events are checked every hour for removal, so any time interval less than that is unneccesary

ended events are stored in a separate collection from other events.
ended event data is used in the ADMIN PAGE to provide statistics of the event that ended


#### LOGIN Module

Handles signing in an Admin via the password, and will then attach them to a variable for the current connected admin, so only one person can attempt to change things at a time.


#### EMAIL Module

Mostly unused, primary functionalioty is to send emails to the given HOST_EMAIL from the .env to provide the data of the events that have ended.

Has Support and infrastructure to handle sending emails to all teachers that exist and all participants who provided an email(DEPRECATED)

### FRONTEND

#### MAIN PAGE

Provides the user with a map to view the campus, along with markers which when clicked will show the program info and POW.

#### ADMIN PAGE

Will prompt the user to input the admin password, which is set in the backend ENV. will not provide anything from the backend if said password is incorrect. allows the admin to view currently created events, ongoing events. and a graph of the statistics of previous events. Admin can delete any ongoing or future events currently queued to happen.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


#### BACKEND


`ADMIN_PASSWORD` Password for the admin

`HOST_EMAIL` email any messages will be sent from, needs to be registered through google to allow

`MONGO_URI` the database collection uri

`NODEMAILER_PASS` the provided key google gives to allow you to send emails through code


#### FRONTEND

NONE
## Deployment

To deploy you will need to set up the env file for onrender

front and backend are two separate parts of the site and need to be hosted as such


host backend first, set the backend url in the .env for frontend once it is running

backend needs to be named eponBack to work

(change build folder to backend when building the backend server)
before building

- npm i --force

- npm run build (frontend)

- node ./backend/server.js (backend)

to save space on server set src and public to ignored for backend and backend ignored on frontend.


## Authors

- [@RogerGrange](https://github.com/RogerRandomDev)
- [@TrentonBlock](https://github.com/RagingFury6)
- [@Logan]()
- [@Dylan]()
- [@Victor]()


