const socket = io();

const buttonOne = document.querySelector("#room1 button");
const buttonTwo = document.querySelector("#room2 button");
const participantsOne = document.querySelector("#participantsOne");
const participantsTwo = document.querySelector("#participantsTwo");

function handleNicknameSubmit() {
	fetch(`/api/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response) {
		if (response.status == 200) {
			return response.json();
		} else {
			throw new Error('break');
		}
	}).then(function(result) {
		socket.emit("nickname", result.id);
	}).catch((error) => {});
}

function handleButtonOneSubmit(event) {
	event.preventDefault();
	handleNicknameSubmit();
	socket.emit("enter_room", 1);
}

function handleButtonTwoSubmit(event) {
	event.preventDefault();
	handleNicknameSubmit();
	socket.emit("enter_room", 1);
}

buttonOne.addEventListener("click", handleButtonOneSubmit);
buttonTwo.addEventListener("click", handleButtonTwoSubmit);

(function init() {
	fetch(`/api/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response) {
		if (response.status == 200) {
			return response.json();
		} else {
			throw new Error('break');
		}
	}).then(function(result) {
		socket.emit("nickname", result.id);
	}).catch((error) => {});
})();