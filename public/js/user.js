const userBox = document.getElementById("user-box");

function handleButton(event) {
	const tooId = this.dataset.id;
	fetch(`/api/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	}).then(function(response) {
		if (response.status == 200) {
			return response.json();
		}
	}).then(function(response) {
		if (response) {
			console.log("bb", response);
			fetch(`/api/follow`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fromId: response.userId, toId: tooId }),
			}).then(function(response) {
				if (response.status === 200) {
				}
			})
		}
	});	
}

function shapeMaker(payload) {
	const p1 = document.createElement("p");
	const p2 = document.createElement("p");
	const p3 = document.createElement("p");
	const button = document.createElement("button");
	p1.innerText = `ID: ${payload.id}`;
	p2.innerText = `가입날짜: ${payload.createdAt}`;
	p3.innerText = `친구수: 0`;
	button.innerHTML = `친구 요청`;
	button.dataset.id = payload.userId;
	userBox.append(p1);
	userBox.append(p2);
	userBox.append(p3);
	userBox.append(button);

	console.log(button);
	button.addEventListener("click", handleButton);	
}

(function init() {
	fetch(`/api/all/user`, {
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
			for (let i = 0; i < response.length; i++)
			{
				shapeMaker(response[i]);
			}
		}
	})
})();