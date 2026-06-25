// ===============================
// PriceWatch - Authentication
// ===============================

// Register User
async function registerUser(fullName, email, phone, password) {

    const { data, error } = await supabase
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
        alert("Registration Failed!\n" + error.message);
        return false;
    }

    alert("Registration Successful!");

    window.location.href = "login.html";

    return true;
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
        return false;
    }

    // Save logged in user
    localStorage.setItem("user", JSON.stringify(data));

    window.location.href = "index.html";

    return true;
}


// Logout
function logoutUser() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}


// Check Login
function checkLogin() {

    const user = localStorage.getItem("user");

    if (!user) {

        window.location.href = "login.html";

    }

}


// Get Logged In User
function getCurrentUser() {

    return JSON.parse(localStorage.getItem("user"));

}