const socket = io();

const buttonOne = document.querySelector("#room1 button");
const buttonTwo = document.querySelector("#room2 button");
const participantsOne = document.querySelector("#participantsOne");
const participantsTwo = document.querySelector("#participantsTwo");
const roomsBox = document.getElementById("rooms-box");
const chattingBox = document.getElementById("chatting-box");
const chat = document.getElementById("chat");
const exitButton = document.getElementById("exit-button");
const roomNum = document.getElementById("room-num");
const currentParticipants = document.getElementById("currentParticipants");
//const inputForm = document.getElementById("input-form");

chattingBox.hidden = true;
let tempRoomName;

async function handleNicknameSubmit() {
	await fetch(`/api/user`, {
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
		console.log(result.id);
		socket.emit("nickname", result.id);
	}).catch(error => {});
}

function handleExitButton(event) {
	event.preventDefault();

	socket.emit("exit_room", tempRoomName, showRooms);
}

function addMessage(message) {
	const ul = chat.querySelector("ul");
	const li = document.createElement("li");
	li.innerText = message;
	ul.appendChild(li);
}

function showRooms() {
	fetch(`/api/room?` + new URLSearchParams({ roomName: tempRoomName, }).toString(), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response) {
		if (response.status === 200) {
			return response.json();
		}
	}).then(function(response) {
		if (response) {
			if (tempRoomName === "1") {
				participantsOne.innerHTML = response.room.participantsNum;	
			} else {
				participantsOne.innerHTML = response.room.participantsNum;
			}
		}
	});

	chattingBox.hidden = true;
	roomsBox.hidden = false;
}

function showChatting() {
	roomNum.innerHTML = tempRoomName;

	fetch(`/api/room?` + new URLSearchParams({ roomName: tempRoomName, }).toString(), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response) {
		if (response.status === 200) {
			return response.json();
		}
	}).then(function(response) {
		if (response) {
			currentParticipants.innerHTML = response.room.participantsNum;
				
		}
	});

	roomsBox.hidden = true;
	chattingBox.hidden = false;
	
	exitButton.addEventListener("click", handleExitButton);
}

function handleMessageSubmit(event) {
	event.preventDefault();
	console.log("hi");
	/*const input = document.getElementById("input2");
	const value = input.value;
	socket.emit("new_message", input.value, tempRoomName, () => {
		addMessage(`You: ${value}`);
	});
	input.value = "";*/
}

async function handleButtonOneSubmit(event) {
	event.preventDefault();
	await handleNicknameSubmit();
	tempRoomName = "1";
	socket.emit("enter_room", "1", showChatting);
}

async function handleButtonTwoSubmit(event) {
	event.preventDefault();
	await handleNicknameSubmit();
	tempRoomName = "2";
	socket.emit("enter_room", "2", showChatting);
}

buttonOne.addEventListener("click", handleButtonOneSubmit);
buttonTwo.addEventListener("click", handleButtonTwoSubmit);
//inputForm.addEventListener("submit", handleMessageSubmit);

socket.on("welcome", (roomName, user, newCount) => {
	if (roomName === "1") {
		console.log("one");
		participantsOne.innerHTML = newCount;
	} else {
		participantsTwo.innerHTML = newCount;
	}
	if (roomName === tempRoomName) {
		console.log("current");
		currentParticipants.innerHTML = newCount;
		addMessage(`${user}님이 입장`);
	}
});

socket.on("bye", (roomName, user, newCount) => {
	if (roomName === "1") {
		participantsOne.innerHTML = newCount;
	} else {
		participantsTwo.innerHTML = newCount;
	}
	if (roomName === tempRoomName) {
		console.log("kk");
		currentParticipants.innerHTML = newCount;
		addMessage(`${user}님이 퇴장`);
	}
});

socket.on("new_message", addMessage);

(function init() {
	let roomInfo;
	// room1
	fetch(`/api/room?` + new URLSearchParams({ roomName: 1, }).toString(), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response1) {
		if (response1.status == 200) { // exist
			return response1.json();
		} else if (response1.status == 201) { // non-exist
			fetch(`/api/room`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ roomName: "1" }),
			}).then(function(response) {
				if (response.status == 200) {
					return response.json();
				}
			}).then(function(response) {
				roomInfo = response.room;
				participantsOne.innerHTML = roomInfo.participantsNum;			
			})
		}
	}).then(function(response) {
		if (response) {
			roomInfo = response.room;	
			participantsOne.innerHTML = roomInfo.participantsNum;
		}	
	});

	// room2
	fetch(`/api/room?` + new URLSearchParams({ roomName: 2, }).toString(), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response2) {
		if (response2.status == 200) { // exist
			return response2.json();
		} else if (response2.status == 201) { // non-exist
			fetch(`/api/room`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ roomName: "2" }),
			}).then(function(response) {
				if (response.status == 200) {
					return response.json();
				}
			}).then(function(response) {
				roomInfo = response.room;
				participantsTwo.innerHTML = roomInfo.participantsNum;			
			})
		}
	}).then(function(response) {
		if (response) {
			roomInfo = response.room;	
			participantsTwo.innerHTML = roomInfo.participantsNum;
		}	
	});
})();