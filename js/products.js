// =====================================
// PriceWatch - Products
// =====================================

async function addProduct(productUrl) {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    let source = "Other";

    const lowerUrl = productUrl.toLowerCase();

    if (lowerUrl.includes("amazon"))
        source = "Amazon";

    else if (lowerUrl.includes("flipkart"))
        source = "Flipkart";

    else if (lowerUrl.includes("meesho"))
        source = "Meesho";

    else if (lowerUrl.includes("github.io"))
        source = "Demo";

    const { error } = await supabaseClient

        .from("products")

        .insert([

            {

                product_name: "Pending",

                product_url: productUrl,

                previous_price: null,

                current_price: null,

                price_change: null,

                status: "Pending",

                source: source,

                user_id: currentUser.id

            }

        ]);

    if (error) {

        alert(error.message);

        console.log(error);

        return;

    }

    alert("Product added successfully!");

    window.location.href = "index.html";

}