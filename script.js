// Sample Restaurant Data with Menus
const restaurants = [
    {
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "30 mins",
        address: "Sector 15, Navi Mumbai",
        image: "assets/images/pizza-palace.jpg",
        menu: [
            { name: "Margherita Pizza", price: "₹250", description: "Classic cheese and tomato pizza" },
            { name: "Pepperoni Pizza", price: "₹300", description: "Pepperoni and mozzarella" },
            { name: "Veggie Pizza", price: "₹280", description: "Loaded with fresh vegetables" },
        ],
    },
    {
        name: "Dragon Wok",
        cuisine: "Chinese",
        rating: 4.2,
        deliveryTime: "25 mins",
        address: "Vashi, Navi Mumbai",
        image: "assets/images/dragon-wok.jpg",
        menu: [
            { name: "Kung Pao Chicken", price: "₹200", description: "Spicy stir-fried chicken with peanuts" },
            { name: "Fried Rice", price: "₹180", description: "Vegetable fried rice" },
            { name: "Dumplings", price: "₹150", description: "Steamed pork dumplings" },
        ],
    },
    {
        name: "Spice Garden",
        cuisine: "Indian",
        rating: 4.7,
        deliveryTime: "40 mins",
        address: "Kharghar, Navi Mumbai",
        image: "assets/images/spice-garden.jpg",
        menu: [
            { name: "Butter Chicken", price: "₹350", description: "Creamy tomato-based curry" },
            { name: "Biryani", price: "₹300", description: "Fragrant rice dish with spices" },
            { name: "Paneer Tikka", price: "₹250", description: "Grilled cottage cheese" },
        ],
    },
    {
        name: "Burger Barn",
        cuisine: "American",
        rating: 4.3,
        deliveryTime: "20 mins",
        address: "Seawoods, Navi Mumbai",
        image: "assets/images/burger-barn.jpg",
        menu: [
            { name: "Classic Cheeseburger", price: "₹200", description: "chicken patty with cheese" },
            { name: "Veggie Burger", price: "₹180", description: "Plant-based patty" },
            { name: "Chicken Burger", price: "₹220", description: "Grilled chicken patty" },
        ],
    },
    {
        name: "Sushi Haven",
        cuisine: "Japanese",
        rating: 4.6,
        deliveryTime: "35 mins",
        address: "Belapur, Navi Mumbai",
        image: "assets/images/sushi-haven.jpg",
        menu: [
            { name: "Sushi Platter", price: "₹400", description: "Assorted sushi rolls" },
            { name: "Ramen", price: "₹300", description: "Japanese noodle soup" },
            { name: "Tempura", price: "₹250", description: "Deep-fried seafood and vegetables" },
        ],
    },
];

// Cart Data
let cart = [];

// Load Restaurants
function loadRestaurants(filteredRestaurants = restaurants) {
    const restaurantGrid = document.getElementById("restaurantGrid");
    restaurantGrid.innerHTML = "";
    filteredRestaurants.forEach((restaurant, index) => {
        const card = `
            <div class="restaurant-card" onclick="openMenuModal(${index})">
                <img src="${restaurant.image}" alt="${restaurant.name}">
                <div class="details">
                    <h3>${restaurant.name}</h3>
                    <p>Cuisine: ${restaurant.cuisine}</p>
                    <p><i class="fas fa-star"></i> ${restaurant.rating}</p>
                    <p>Delivery: ${restaurant.deliveryTime}</p>
                    <p>Address: ${restaurant.address}</p>
                    <button class="btn-view-menu">View Menu</button>
                </div>
            </div>
        `;
        restaurantGrid.innerHTML += card;
    });
}

// Open Menu Modal
function openMenuModal(index) {
    const restaurant = restaurants[index];
    const menuModal = document.getElementById("menuModal");
    const menuTitle = document.getElementById("menuTitle");
    const menuItems = document.getElementById("menuItems");

    menuTitle.textContent = `${restaurant.name} Menu`;
    menuItems.innerHTML = restaurant.menu
        .map(
            (item) => `
            <div class="menu-item">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p><strong>${item.price}</strong></p>
                <button onclick="addToCart('${item.name}', '${item.price}')">Add to Cart</button>
            </div>
        `
        )
        .join("");

    menuModal.style.display = "block";
}

// Close Menu Modal
function closeMenuModal() {
    document.getElementById("menuModal").style.display = "none";
}

// Add to Cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    alert(`Added ${itemName} to cart!`);
}

// Open Cart Modal
function openCartModal() {
    const cartModal = document.getElementById("cartModal");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = cart
        .map(
            (item) => `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
        `
        )
        .join("");

    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace("₹", "")), 0);
    cartTotal.textContent = `Total: ₹${total}`;

    cartModal.style.display = "block";
}

// Close Cart Modal
function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
}

// Checkout (Placeholder Function)
function checkout() {
    alert("Proceeding to checkout!");
    cart = []; // Clear cart after checkout
    closeCartModal();
}

// Open Offers Modal
function openOffersModal() {
    document.getElementById("offersModal").style.display = "block";
}

// Close Offers Modal
function closeOffersModal() {
    document.getElementById("offersModal").style.display = "none";
}

// Search Restaurants
function searchRestaurants() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.cuisine.toLowerCase().includes(query)
    );
    loadRestaurants(filtered);
}

// Filter and Sort Restaurants
function filterAndSortRestaurants() {
    const cuisine = document.getElementById("cuisineFilter").value;
    const rating = parseFloat(document.getElementById("ratingFilter").value);
    const deliveryTime = parseInt(document.getElementById("deliveryTimeFilter").value);
    const sortBy = document.getElementById("sortBy").value;

    let filtered = restaurants.filter(restaurant => {
        return (
            (cuisine ? restaurant.cuisine === cuisine : true) &&
            (rating ? restaurant.rating >= rating : true) &&
            (deliveryTime ? parseInt(restaurant.deliveryTime) <= deliveryTime : true)
        );
    });

    if (sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "deliveryTime") {
        filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }

    loadRestaurants(filtered);
}

// Add Event Listeners for Filters and Sorting
document.getElementById("cuisineFilter").addEventListener("change", filterAndSortRestaurants);
document.getElementById("ratingFilter").addEventListener("change", filterAndSortRestaurants);
document.getElementById("deliveryTimeFilter").addEventListener("change", filterAndSortRestaurants);
document.getElementById("sortBy").addEventListener("change", filterAndSortRestaurants);

// Modals
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

function openSignupModal() {
    document.getElementById("signupModal").style.display = "block";
}

function closeSignupModal() {
    document.getElementById("signupModal").style.display = "none";
}

// Initial Load
loadRestaurants();