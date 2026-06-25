const supabaseUrl = "https://bqwhpspwmntwtqtdtnno.supabase.co";
const supabaseKey = "sb_publishable_cFYIkgTmIuMdETos-COqbg_N2q2y3jO";

const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("products")
        .select("*");

    if (error) {
        console.log("Error:", error);
        return;
    }

    console.log("Products:", data);

    let rows = "";

    data.forEach(product => {

        rows += `
            <tr>
                <td>${product.product_name}</td>
                <td>${product.current_price ?? "-"}</td>
                <td>${product.target_price}</td>
            </tr>
        `;

    });

    document.getElementById("products").innerHTML = rows;
}

loadProducts();