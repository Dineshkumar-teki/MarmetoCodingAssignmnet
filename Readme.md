
code Explanation:

1. **Fetching Product Data:**
   - The code retrieves product details from a JSON file hosted on Shopify's server using the Fetch API.
   - It checks if the response is okay and then parses the JSON data.

2. **Displaying Product Information:**
   - Vendor name, product title, price, discount percentage, and compare price are displayed.
   - These details are dynamically inserted into the HTML document using DOM manipulation.

3. **Options for Color and Size:**
   - For color options, the code creates colored divs based on the available colors in the product data.
   - Each color div is clickable, allowing users to select a color.
   - For size options, radio buttons are created dynamically based on the available sizes.

4. **Adjusting Quantity:**
   - Plus and minus buttons allow users to adjust the quantity of the product.
   - Event listeners are attached to these buttons to update the displayed quantity accordingly.

5. **Adding to Cart:**
   - A "Add to Cart" button is provided for users to add the selected product to their cart.
   - Upon clicking the button, a message is displayed indicating that the product has been added to the cart.
   - If a color or size option is not selected, an error message is displayed instead.

6. **Error Handling:**
   - Error handling is implemented to ensure that users select both a color and a size before adding the product to the cart.
   - If either of these options is not selected, an appropriate error message is displayed.

7. **Product Images:**
   - Thumbnail images are provided to showcase different views of the product.
   - Clicking on a thumbnail updates the main product image to the corresponding view.

Overall, the code provides a user-friendly interface for selecting product options, adjusting quantity, and adding items to the cart while ensuring proper error handling.
