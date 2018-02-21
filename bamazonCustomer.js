// NPM packages
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var purchaseTotal = 0;
var subTotal = 0;

// MySQL pkg
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "limbs008",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// load DB
function loadProducts() {
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Use CONSOLE.TABLE pkg
    console.table(res);

    askCustomerItemNumber(res);
  });
}

// get Item#
function askCustomerItemNumber(inventory) {
 
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter the item_id of the Product you want to buy [Quit with X]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "x";
        }
      }
    ])
    .then(function(val) {
      

      endProgram(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      
      if (product) {
        
        askCustomerForQuantity(product);
      }
      else {
        
        console.log("\nSorry, that selected item is not in the List.");
        loadProducts();
      }
    });
}


function askCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "Enter Quantity [Quit with X]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "x";
        }
      }
    ])
    .then(function(val) {
      
      endProgram(val.quantity);
      var quantity = parseInt(val.quantity);

      
      if (quantity > product.quantity_inventory) {
        console.log("\n Sorry, not enough Quantity in Inventory\r\n");
        loadProducts();
      }
      else {
        
        makePurchase(product, quantity);
      }
    });
}


function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET quantity_inventory = quantity_inventory - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // subTotal = price * quantity
      subTotal = product.price * quantity;
      purchaseTotal = purchaseTotal + subTotal;

      console.log("\nYour purchase of " + quantity + " " + product.product_name + "'s!  was successful \r\n");

      console.log("\nYour Sub-Total:  $" + subTotal + "\r\n");

      console.log("\nYour Total Purchase is:  $" + purchaseTotal + "\r\n");

      loadProducts();
    }
  );
}


function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}


function endProgram(choice) {
  if (choice.toLowerCase() === "x") {
    
    console.log("Thank you for Shopping, have a nice day.");
    process.exit(0);
  }
	
}