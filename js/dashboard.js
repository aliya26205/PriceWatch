// ================================
// PriceWatch Dashboard
// ================================

async function loadDashboard() {

    // Get Logged In User
    const currentUser = getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Welcome Message
    document.getElementById("welcomeUser").innerText =
        "Welcome, " + currentUser.full_name;

    // Fetch Products of Current User
    const { data: products, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("id", { ascending: false });

    if (error) {
        alert(error.message);
        return;
    }

    // Dashboard Counts
    let totalProducts = products.length;
    let increased = 0;
    let decreased = 0;
    let noChange = 0;

    // Table Body
    let tableRows = "";

    products.forEach(product => {

        if (product.status === "Increased")
            increased++;

        else if (product.status === "Decreased")
            decreased++;

        else if (product.status === "No Change")
            noChange++;

        tableRows += `
        <tr>

            <td>${product.product_name}</td>

            <td>${product.source ?? "-"}</td>

            <td>₹ ${product.current_price ?? "-"}</td>

            <td>₹ ${product.previous_price ?? "-"}</td>

            <td>${product.price_change ?? "-"}</td>

            <td>${product.status ?? "Pending"}</td>

            <td>${product.last_checked ?? "-"}</td>

            <td>
                <button onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </td>

        </tr>
        `;

    });

    // Summary
    document.getElementById("totalProducts").innerText = totalProducts;

    document.getElementById("priceIncreased").innerText = increased;

    document.getElementById("priceDecreased").innerText = decreased;

    document.getElementById("noChange").innerText = noChange;

    // Load Table
    document.getElementById("productsTable").innerHTML = tableRows;

}



// Delete Product

async function deleteProduct(productId) {

    const confirmDelete = confirm(
        "Delete this product?"
    );

    if (!confirmDelete)
        return;

    const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {

        alert(error.message);
        return;

    }

    alert("Product Deleted Successfully.");

    loadDashboard();

}