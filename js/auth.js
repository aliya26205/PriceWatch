// ===============================
// PriceWatch Authentication
// ===============================

// Register User
async function registerUser(fullName, email, phone, password) {

    const { error } = await supabase
        .from("users")
        .insert([
            {
                full_name: fullName,
                email: email,
                phone: phone,
                password_hash: password
            }
        ]);

    if (error) {

        alert(error.message);

        return;
    }

    alert("Registration Successful!");

    window.location.href = "login.html";

}



// Login User

async function loginUser(email, password) {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password)
        .single();

    if (error || !data) {

        alert("Invalid Email or Password");

        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(data)
    );

    window.location.href = "index.html";

}



// Logout

function logoutUser() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}



// Check Login

function checkLogin() {

    const user =
        localStorage.getItem("currentUser");

    if (!user) {

        window.location.href = "login.html";

    }

}



// Get Current User

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}