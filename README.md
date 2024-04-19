# inventory-manager
for z-prefix

For Server

install:
knex,
pg,
bcrypt,
express

npx knex migrate:latest
npx knex seed:run
npm start

should start on localhost 8081


for frontend
install:
react
nodemon
bcrypts
react-router-dom
react-dom

npm start

Description:
When any user visits the page you should see three buttons on the top:

Home:
- View all player, equipment, count, and first 100 characters of the decription
- Selecting the Equipment will send you to an Item Details page for that equipment and view full description.

Login:
- a visitor can enter their username and password and if authenticated, be brought to their user items page to view all their items and enable edit to update, add, or delete entries for all to see
- a button labeled "Create New Account" will bring you to the Create User page

Create User:
- A visitor without an account can create their own account
- they need to enter a username and password along with confirming their password
- it will check the users database to see if the username is taken
- it will hash their password
- once created, the visitor will be directed to the login page to login

When a user is logged in, the "Home" button should be changed to "All Inventory". The "login" button will change to "logout" and set LoggedIn. LoggedIn will determine what is conditionally rendered.

in the My Inventory page a user can toggle edit on the bottom left and all fields are able to be changed and updated. Along with this there will be a delete button next to every line item. A logged in user can also use the add item button to take them to an Add item page to add an additional item.




Rubric: https://docs.google.com/document/d/1f_OQuUo92NRd4zsBxeiyi_XHsXl48_BQCTAoOOh1bhU/edit?usp=sharing

Stories
As an inventory manager I want to be able to create an account so that I can track my inventory.

As an inventory manager I want to be able to log into my account so that I can see my inventory of items.

After logging in, the inventory manager should be redirected to their inventory of items.
As an inventory manager I want to be able to create a new item so that I can share my item details with the world.

After the item is created, the inventory manager should be redirected to their inventory of items.
An item displays name, description, and quantity.
As an inventory manager I want to be able to see a my entire inventory of items.

The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
As an inventory manager I want to be able to see any individual item I have added.

The full item information should be displayed.
As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.

When the user toggles edit mode, the page remains the same and the fields become editable.
As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.

When the user deletes the item they should be redirected to their inventory of items.
As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.

Unauthenticated users should be able to view all items, and any single item.
The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.
As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

Unauthenticated users should be able to view all items, and any single item.
As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.

Unauthenticated users should be able to view all items, and any single item.