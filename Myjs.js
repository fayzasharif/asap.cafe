var cartCount = 0;
var cartItems = {};
var cartPrices = {};

function setupNavigation() {
  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");

  if (!toggle || !links) {
    return;
  }

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function setupCart() {
  var buttons = document.querySelectorAll(".add-cart");
  var count = document.getElementById("cartCount");
  var message = document.getElementById("cartMessage");
  var cartButton = document.getElementById("cartButton");
  var dropdown = document.getElementById("cartDropdown");
  var cartList = document.getElementById("cartItems");
  var total = document.getElementById("cartTotal");
  var checkoutButton = document.getElementById("checkoutButton");

  function getCartTotal() {
    var sum = 0;

    Object.keys(cartItems).forEach(function (productName) {
      sum += cartItems[productName] * cartPrices[productName];
    });

    return sum;
  }

  function updateCartView() {
    if (count) {
      count.textContent = cartCount;
    }

    if (total) {
      total.textContent = getCartTotal() + " SAR";
    }

    if (!cartList) {
      return;
    }

    cartList.innerHTML = "";

    if (cartCount === 0) {
      var empty = document.createElement("p");
      empty.className = "empty-cart";
      empty.textContent = "No products added yet.";
      cartList.appendChild(empty);
      return;
    }

    Object.keys(cartItems).forEach(function (productName) {
      var row = document.createElement("div");
      row.className = "cart-line";

      var name = document.createElement("strong");
      name.textContent = productName;

      var quantity = document.createElement("span");
      quantity.textContent = "x" + cartItems[productName] + " - " + (cartItems[productName] * cartPrices[productName]) + " SAR";

      row.appendChild(name);
      row.appendChild(quantity);
      cartList.appendChild(row);
    });
  }

  if (cartButton && dropdown) {
    cartButton.addEventListener("click", function () {
      var isHidden = dropdown.hasAttribute("hidden");

      if (isHidden) {
        dropdown.removeAttribute("hidden");
      } else {
        dropdown.setAttribute("hidden", "");
      }

      cartButton.setAttribute("aria-expanded", String(isHidden));
    });
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
      if (cartCount === 0) {
        alert("Your cart is empty.");
        return;
      }

      alert("Checkout complete. Total: " + getCartTotal() + " SAR");
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var product = button.dataset.product;
      var price = Number(button.dataset.price);

      cartCount += 1;
      cartItems[product] = (cartItems[product] || 0) + 1;
      cartPrices[product] = price;
      updateCartView();

      if (message) {
        message.textContent = product + " added to cart.";
      }
    });
  });

  updateCartView();
}

function setupContactForm() {
  var form = document.getElementById("contactForm");
  var message = document.getElementById("formMessage");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var text = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !text) {
      message.textContent = "Please fill in all fields.";
      return;
    }

    message.textContent = "Thank you, " + name + ". Your message is ready to send.";
    form.reset();
  });
}

function setupCateringForm() {
  var form = document.getElementById("cateringForm");
  var message = document.getElementById("cateringMessage");

  if (!form || !message) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("cateringName").value.trim();
    var email = document.getElementById("cateringEmail").value.trim();
    var eventType = document.getElementById("eventType").value.trim();
    var details = document.getElementById("eventDetails").value.trim();

    if (!name || !email || !eventType || !details) {
      message.textContent = "Please fill in all catering details.";
      return;
    }

    message.textContent = "Thank you, " + name + ". Your catering request is ready.";
    form.reset();
  });
}

function submitCatering(e) {
  e.preventDefault();

  var name = document.getElementById("c-name").value;
  var email = document.getElementById("c-email").value;
  var phone = document.getElementById("c-phone").value;
  var date = document.getElementById("c-date").value;
  var guests = document.getElementById("c-guests").value;
  var type = document.getElementById("c-type").value;
  var location = document.getElementById("c-location").value;
  var details = document.getElementById("c-details").value;

  var subject = encodeURIComponent("Catering Request - " + type + " - " + name);
  var body = encodeURIComponent(
    "Full Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Event Date: " + date + "\n" +
    "Number of Guests: " + guests + "\n" +
    "Event Type: " + type + "\n" +
    "Event Location: " + location + "\n\n" +
    "Additional Details:\n" + details
  );

  window.location.href = "mailto:asapcafe.sa@gmail.com?subject=" + subject + "&body=" + body;
  alert("Thank you, " + name + "! Your catering request has been prepared. Please send the email that just opened to complete your submission.");
  document.getElementById("cateringForm").reset();
}

document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
  setupCart();
  setupContactForm();
  setupCateringForm();
});
