const signupForm = document.getElementById("signup");
const signupId = document.getElementById("signup-id");
const signuppwd = document.getElementById("signup-pwd");


const handleSubmit = async (event) => {
	event.preventDefault();
	const id = signupId.value;
	const pwd = signuppwd.value;

	const response = await fetch(`/api/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id, password: pwd }),
	});
	if (response.status == 200) {
		id.value = "";
		pwd.value = "";
		console.log("he's back");
	}
}

signupForm.addEventListener("submit", handleSubmit);