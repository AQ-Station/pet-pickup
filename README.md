## AQ Station

This project is focused on creating an application for Airport Animal Quarantine Offices to efficiently and effectively communicate with pet owners in Honolulu, Hawaii.

The Airport Animal Quarantine Offices and the pet-owners have issues communicating with each other, and due to this, there are long delays in checking out pets on the Animal Quarantine side and unnecessarily long wait times for the pet-owners. Our idea is to create an application where there could be little to no issues in communication with the AQ Offices and the pet owners with a queue functionality.

## Features

<ul>
<li>Animal Quarantine officers are able to add, edit, and remove people (and their pet's codes) from the queue.</li>
<li>Pet owners are able to easily find their location in the queue and when they need to pick up their pet.</li>
</ul>

#### See the application live on your mobile or computer devices: http://142.93.62.191/

#### See a live demo of the application: https://youtu.be/ygyjHDvwcgs

## Local Deployment

### Installation

First, install Meteor.

Second, go to the AQ-Station repository, and click the "Clone or download" button to download your new GitHub repo to your local file system. Using GitHub Desktop is a great choice if you use MacOS or Windows.

Third, cd into the app/ directory of your local copy of the repo, and install third party libraries with:

```
$ meteor npm install
```

Lastly, run the system with:

```
$ meteor npm run start
```

If all goes well, the template application will appear at http://localhost:3000.

NOTE: The app utilizes a queuing system to put owners in a waitlist. To activate the queuing system, sign in with an administrative account in a separate a browser or device and navigate to the waitlist page in the side navigation bar. By remaining in the waitlist page, the queue list will continuously operate and assign potential owners with a waitlist number.
  
## Contact Us
This application was created by Chad Oshiro, Joshua Paino, Kha Bui, Kiran Datwani, Maegan Chow, and Nhan Bui for HACC 2021 competition.
