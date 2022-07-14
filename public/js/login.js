const loginForm = document.getElementById("login");
const loginId = document.getElementById("login-id");
const loginPwd = document.getElementById("login-pwd");

const handleLoginSubmit = async (event) => {
	event.preventDefault();
	const id = loginId.value;
	const pwd = loginPwd.value;

	const response = await fetch(`/api/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id, password: pwd }),
	});
	if (response.status == 200) {
		loginId.value = "";
		loginPwd.value = "";
		window.location.href = '/';
	} else if (response.status == 400) {
		loginId.value = "";
		loginPwd.value = "";
		alert("아이디/패스워드가 틀렸습니다❗");
	}
}

loginForm.addEventListener("submit", handleLoginSubmit);