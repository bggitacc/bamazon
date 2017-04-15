# Week of 12 HW: Node.js & MySQL
Challenge #1: Customer View <br>

Create a MySQL Database called Bamazon.<br>
Then create a Table inside of that database called products.<br>
The products table should have each of the following columns:<br>
item_id (unique id for each product)<br>
product_name (Name of product)<br>
department_name<br>
price (cost to customer)<br>
stock_quantity (how much of the product is available in stores)<br>
Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).<br>
Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items <br>available for sale. Include the ids, names, and prices of products for sale.<br>
The app should then prompt users with two messages.<br>
The first should ask them the ID of the product they would like to buy.<br>
The second message should ask how many units of the product they would like to buy.<br>
Once the customer has placed the order, your application should check if your store has enough of the product to meet the <br>customer's request.<br>
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.<br>
However, if your store does have enough of the product, you should fulfill the customer's order.<br>
This means updating the SQL database to reflect the remaining quantity.<br>
Once the update goes through, show the customer the total cost of their purchase.<br>

![Project Image](https://github.com/bggitacc/bamazon/blob/master/screen.jpg)

[Working Project YouTube Video](https://www.youtube.com/embed/4ihcjT2W1GQ)<br><br>
<br>
![Project Image](https://github.com/bggitacc/bamazon/blob/master/cloud9.jpg)<br><br>
[Cloud 9 Working Project](https://ide.c9.io/bootcampbrian/bamazon)<br><br>

Cloud 9 Instructions: <br>
<br>
Click on Cloud 9 Working Project Link.<br>
Navigate to bamazon folder in console cd Bamazon<br>
In terminal console enter mysql-ctl start to start database<br>
Next start project by typing in node bamazonCustomer.js<br>
Follow prompts to test project<br>



