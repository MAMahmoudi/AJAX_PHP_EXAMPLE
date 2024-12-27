// We start by selecting the elements we need to work with
let Add_Btn = document.querySelector("#Add_Btn"),
  Dark_Background = document.querySelector("#Dark_Background"),
  Add_Form = document.querySelector("#Add_Form"),
  Update_Form = document.querySelector("#Update_Form"),
  Main = document.querySelector("main"),
  Table = document.querySelector("#Product_Table");
/////////////////////////////////////////
// We add an event listener to the Add_Btn. This button is used to add a new product
// When the button is clicked, the Show_Add_Form function is called
Add_Btn.addEventListener("click", Show_Add_Form);
// This function is used to show the Add_Form
function Show_Add_Form() {
  // We change the class of the Dark_Background and Add_Form elements to "Shown"
  Dark_Background.classList = "Shown Dark_Background";
  Add_Form.classList = "Shown Add_Form";
}
/////////////////////////////////////////
// This function is used to show the Update_Form
// It is called when the Edit button is clicked
function Show_Update_Form() {
  Dark_Background.classList = "Shown Dark_Background";
  Update_Form.classList = "Shown Add_Form";
}
/////////////////////////////////////////
// We add an event listener to the Dark_Background
// When the Dark_Background is clicked, the Add_Form and Update_Form are hidden
Dark_Background.addEventListener("click", function () {
  Dark_Background.classList = "Hidden";
  Add_Form.classList = "Hidden";
  Update_Form.classList = "Hidden";
});
/////////////////////////////////////////////////////////
// We add an event listener to the Add_Form
Add_Form.addEventListener("submit", function (event) {
  // We prevent the default behavior of the form
  event.preventDefault();
  // We create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  // We open a new POST request to the add.php file
  xhr.open("POST", "add.php");
  // We set the Content-Type header to "application/x-www-form-urlencoded"
  // This header is used to specify the type of data that is being sent to the server
  // In this case, we are sending form data to the server in the format of key-value pairs
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // We add an event listener to the xhr object
  // This event listener is called every time the readyState property of the xhr object changes
  // The readyState property of the xhr object represents the state of the request
  // The onreadystatechange event is triggered when the readyState property changes
  xhr.onreadystatechange = function () {
    // We check if the readyState property is equal to XMLHttpRequest.DONE
    // This means that the request has been completed
    // We also check if the status property is equal to 200
    // This means that the request was successful
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // If the request was successful,
      // we set the innerHTML of the Table element to the responseText of the xhr object
      // The xhr.responseText property contains the result of Read.php file since it is called
      // at the end of add.php
      Table.innerHTML = xhr.responseText;
    }
  };
  // We get the values of the input fields in the Add_Form
  // We use the encodeURIComponent function to encode the values
  // so that they can be sent as part of the URL
  const Product_ID = encodeURIComponent(
    document.getElementById("Product_ID").value
  );
  const Product_Name = encodeURIComponent(
    document.getElementById("Product_Name").value
  );
  const Product_Description = encodeURIComponent(
    document.getElementById("Product_Description").value
  );
  const Price = encodeURIComponent(document.getElementById("Price").value);
  // The following are the parameters that will be sent to the server
  // They are in the format of key-value pairs
  const snd = `Product_ID=${Product_ID}&Product_Name=${Product_Name}&Product_Description=${Product_Description}&Price=${Price}`;
  // We send the parameters to the server
  xhr.send(snd);
  // We hide the Dark_Background and Add_Form
  Dark_Background.classList = "Hidden";
  Add_Form.classList = "Hidden";
});
/////////////////////////////////////////////////////////
// We add an event listener to the Update_Form
Update_Form.addEventListener("submit", function (event) {
  // We prevent the default behavior of the form
  // This is similar to what we did in the Add_Form
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  // We open a new POST request to the Update.php file
  // This file is used to update the product information
  xhr.open("POST", "Update.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      Table.innerHTML = xhr.responseText;
    }
  };

  const Product_ID = encodeURIComponent(
    document.getElementById("Product_ID2").value
  );
  const Product_Name = encodeURIComponent(
    document.getElementById("Product_Name2").value
  );
  const Product_Description = encodeURIComponent(
    document.getElementById("Product_Description2").value
  );
  const Price = encodeURIComponent(document.getElementById("Price2").value);
  // The following are the parameters that will be sent to the server
  const snd = `Product_ID=${Product_ID}&Product_Name=${Product_Name}&Product_Description=${Product_Description}&Price=${Price}`;
  xhr.send(snd);
  Dark_Background.classList = "Hidden";
  Update_Form.classList = "Hidden";
});
/////////////////////////////////////////////////////////
// The following functions are used to delete a product
// It is called when the Delete button is clicked
// The Delete function takes the Product_ID as a parameter
// The Product_ID is used to identify the product that needs to be deleted
// The Product_ID was sent from the Read.php file
// We saved the Product_ID when we created the Delete button
function Delete(Product_ID) {
  var xhr = new XMLHttpRequest();
  // We open a new POST request to the delete.php file
  xhr.open("POST", "delete.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      Table.innerHTML = xhr.responseText;
    }
  };
  var snd = "Product_ID=" + Product_ID;
  xhr.send(snd);
}
/////////////////////////////////////////////////////////
// The following functions are used to edit a product
// It is called when the Edit button is clicked
// The Edit function takes the Product_ID as a parameter
// The Product_ID is used to identify the product that needs to be edited
// The Product_ID was sent from the Read.php file
// We saved the Product_ID when we created the Edit button
function Edit(Product_ID) {
  // We call the Show_Update_Form function to show the Update_Form
  Show_Update_Form();
  var xhr = new XMLHttpRequest();
  // We open a new POST request to the Search.php file
  // This file is used to search for a product using the
  // Product_ID and return the product
  xhr.open("POST", "Search.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // We parse the responseText of the xhr object
      // The responseText contains the product information
      // They were sent from the Search.php file as a JSON object
      // The JSON.parse function is used to convert the JSON object to a JavaScript object
      // data is now a JavaScript object that contains the product information of the product with the Product_ID
      var data = JSON.parse(xhr.responseText);
      // We set the values of the input fields in the Update_Form
      // to the values of the product information
      document.getElementById("Product_ID2").value = data.Product_ID;
      document.getElementById("Product_Name2").value = data.Product_Name;
      document.getElementById("Product_Description2").value =
        data.Product_Description;
      document.getElementById("Price2").value = data.Price;
    }
  };
  var snd = "Product_ID=" + Product_ID;
  xhr.send(snd);
}
/////////////////////////////////////////////////////////
