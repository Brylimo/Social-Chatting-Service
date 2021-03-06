const signupForm = document.getElementById("signup");
const signupId = document.getElementById("signup-id");
const signupPwd = document.getElementById("signup-pwd");

const handleSignupSubmit = async (event) => {
	event.preventDefault();
	const id = signupId.value;
	const pwd = signupPwd.value;

	const response = await fetch(`/api/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id, password: pwd }),
	});
	if (response.status == 200) {
		signupId.value = "";
		signupPwd.value = "";
		window.location.href = '/';
	} else if (response.status == 400) {
		signupId.value = "";
		signupPwd.value = "";
		alert("π­ μ€λ³΅λ μμ΄λμλλ€. λ€λ₯Έ μμ΄λλ₯Ό μλ ₯ν΄μ£ΌμΈμβ");
	}
}

signupForm.addEventListener("submit", handleSignupSubmit);