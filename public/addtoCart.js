$(document).ready(function () {
    // Using event delegation
    $(document).on('click', '.add-to-cart-btn', function () {
        const id = $(this).data('id');
        const title = $(this).data('title');
        const price = $(this).data('price');
        const image = $(this).data('image');

        console.log('Adding to cart:', { id, title, price, image });

        // Proceed with the fetch API call or AJAX as previously described
        fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, price, image }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the server responds with JSON
            })
            .then(data => {
                alert('Item added to cart');

                // Update the cart UI
                const cartItems = $('#cart-items');
                const cartTotal = $('#cart-total');

                // Create a new cart item element
                const cartItem = $('<li></li>');
                cartItem.html(`
                <img src="${image}" alt="${title}" style="width: 50px; height: auto;">
                <span>${title} - $${price.toFixed(2)}</span>
            `);

                // Add the cart item to the cart
                cartItems.append(cartItem);

                // Update the total price
                const currentTotal = parseFloat(cartTotal.text());
                const newTotal = currentTotal + price;
                cartTotal.text(newTotal.toFixed(2));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function increaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity${itemId}`);
    let quantity = parseInt(quantityElement.innerText, 10);
    quantityElement.innerText = ++quantity;
    updateCartQuantity(itemId, quantity);
}

function decreaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity${itemId}`);
    let quantity = parseInt(quantityElement.innerText, 10);
    if (quantity > 1) { // Prevents quantity from going below 1
        quantityElement.innerText = --quantity;
        updateCartQuantity(itemId, quantity);
    }
}

