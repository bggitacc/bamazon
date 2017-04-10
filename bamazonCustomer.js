// set up required files

            var mysql = require("mysql");
            var inquirer = require("inquirer");

// set up global array

            var choice = [];

//set database connection object

            var connection = mysql.createConnection ({
            host: "localhost",
            port: 3306,
            user: "bootcampbrian",
            password: "",
            database: "Bamazon"
})

// connect to database

            connection.connect(function(err) {
    
            if (err) { console.log("error")
        
        }
    
});

     
// display items for sale

            function display () {
     
//set query all products

            var query = "SELECT * FROM products ";

            connection.query(query, function(err, res) {
        
            if (err) {
// log errors

            console.log(err);
        }
        
// console log products

            for (var i = 0; i < res.length; i++) {
          
//build global array

            choice.push(res[i]);
          
// format id 2 digits

            if (res[i].ID.toString().length < 2) {
              
            var prodId = "0" + res[i].ID;
              
            } else {
              
            var prodId = res[i].ID;
            
            }
          
//format title same length

            var formatStringTitle = "            ";
            var x = 80 - res[i].product_name.length;
           
            formatStringTitle = formatStringTitle.substring(0,x);
          
// format price
            var formatStringPrice = "     ";
           
            var x = 5 - res[i].price.toFixed(2).toString().length;
           
           
            formatStringPrice = formatStringPrice.substring(0,x);
      
// format category

            var formatStringCat = "          ";
           
            var x = 10 - res[i].dept_name.length;
           
            formatStringCat = formatStringCat.substring(0,x);
          
// console log only products in stock

            if (choice[i].stock_qty > 0) {
           
            console.log("Product ID : " + prodId + "   " + res[i].product_name + formatStringTitle + "   Price :  $" + res[i].price.toFixed(2) + formatStringPrice + "   Department : " + res[i].dept_name + formatStringCat + "    Qty In Stock :" + res[i].stock_qty);
      
       }
       
    }
    
            console.log(" ");
        
            qOne();
    
// get user product selection

            function qOne() {
        
// prompt user

            inquirer.prompt({
            name: "product",
            type: "input",
            message: "What is the Product ID that you would like to purchase ?"
            }).then(function(answer) {
      
            var userInput = parseInt(answer.product);
            var checkInput = isNaN(userInput);
     
// check for valid input

            if (checkInput) {
    
            console.log(" ");
            console.log("Sorry that is not a valid Product Id !");
            console.log(" ");
    
            qOne();
            
            return;
    
    
}

// query database
            var query = "SELECT * FROM products where ID = " + userInput;

            connection.query(query, function(err, res) {
        
            if (err) {
// log errors
            console.log(err);
        }
        
// check for no match return

            if (res.length < 1) {
            
            console.log(" ");
            console.log("Sorry no product with that ID found !");
            console.log(" ");
            
            qOne();
            
            return;
            
        }
        
            qTwo(userInput);
        
             });
// get user quantities function

            function qTwo(userInput) {
            console.log(" ");
            var invCheck = choice[userInput-1].stock_qty;
            
            if (invCheck < 1) {
                
                console.log("  ");
                console.log("Sorry this item is now out of stock !");
                console.log("  ");
                
                return qOne();
                
            }
        
      
// get user quantity

            inquirer.prompt({
            name: "quan",
            type: "input",
            message: "How many would you like to purchase ?"
            }).then(function(answer) { 
  
// validate enough on hand

            if (answer.quan > invCheck) {
          
            console.log(" ");
            console.log("Sorry not enough in stock ! Please lower quantity");
            console.log(" ");
          
            return  qTwo(userInput);
      }
      
// calculate total sale

            var totalSale = choice[userInput-1].price * answer.quan;
            invCheck = invCheck - answer.quan;
      
    
// display total

            console.log(" ");
      
            console.log("Your total is : $" + totalSale.toFixed(2));
      
// update database inventory
      
            var query = "UPDATE products SET stock_qty = " + invCheck + " where id = " + choice[userInput-1].ID;



            connection.query(query, function(err, res) {
        
            if (err) {
            
// log errors

            console.log(err);
        
        }
        
// message user of remaining inventory

            console.log(" ");
            console.log("There are now " + invCheck + " left in stock !");
    
            start();
                         });
    
 
                    });
  
                }
      
         });
    
        }
  
    });

}
        // display products menu
            display();
            // ask user to shop again
        function start() {
        console.log(" ");
        inquirer.prompt({
        name: "start",
        type: "input",
        message: "Press <enter> to shop agian"
        }).then(function(answer) {
        choice = [];
        console.log(" ");
        display();
      
  });
}

// end of line!