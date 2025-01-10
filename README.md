# AJAX/PHP Example

This code is an example of how to use AJAX with PHP to create a simple web application.

The application is a simple page that allows the user to add a new product to a list of products. The user can enter the ID, name, price and description of the product, and then click a button to add it to the list. The list of products is always displayed on the page, and the users can add, modify and delete any products as they want.

## The index page

The index page is a simple HTML page that contains a form to add a new product and a table to display the list of products. The form contains four input fields: ID, name, price and description, and a button to add the product to the list. The table contains four columns: ID, name, price and description, and a button to delete the product from the list.

The forms to add and update products are hidden by default, and are displayed when the user clicks the "Add" or "Update" buttons.

Bellow that, an empty table is created without even a header. The latter and the rows are created dynamically by the Read.php code. That's why we did require the Read.php inside the table element.

The other files are well commented and self-explanatory.
