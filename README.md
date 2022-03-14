# Art 22 Final Project

This website was created by Max Ladabaum for UCSB's Art 22 course taught by Prof. Kamandy.
All code was written by Max Ladabaum from 2/25-3/11.

## Website Link
The website is available for public use at: https://give-flowers.herokuapp.com

## Code Structure
Graphics were originally coded in Processing and then converted to p5.js. The p5.js sketch along with the entire p5.js library is inserted
into a node.js stencil. The p5.js sketch is modified to use socket.io for web messaging. Using heroku for node.js, the website is made publically available.
Due to lack of time and funding, there is no database for this application. The code is structured such that clients act as servers to other clients, and all 
clients sync database values with each other. (Unfortunately, this "client as a database" structure means that if all clients go off-line, the database values of 
flowers given and flowers taken will be wiped. As long as one client is online at all times (need not be the same client), the database will remain up-to-date.)

## Functionality


When a user requests flowers, a random number of flowers (8-15) with randomly selected colors (red, green, pink)
and a random number of petals (5, 7, 9) are generated. The each flower is an object. The flower petals were hand drawn using Procreate on iPad.
