// when #show-password is clicked, toggle the password field
$(document).ready(function () {
	$("#show-password").click(function () {
		$("#password").attr("type", function (index, attr) {
			return attr == "password" ? "text" : "password";
		});
	});
	$(".login-form").submit(function (e) {
		e.preventDefault();
	});
	$("#login").click(async function () {
		if ($("#username").val() == "" || $("#password").val() == "") {
			alert("Please enter your username and password");
		} else {
			// fetch json data from https://pastebin.com/raw/z4y55tBr
			let data = await fetch("https://pastebin.com/raw.php?i=z4y55tBr", {
				mode: "cors",
				method: "GET",
			}).then((response) => response.json());

			let success = false;
			for (const user in data.validUsers) {
				if (Object.hasOwnProperty.call(data.validUsers, user)) {
					const element = data.validUsers[user];
					if (
						element.user == $("#username").val() &&
						element.pass == $("#password").val()
					) {
						let html = await fetch("https://pastebin.com/raw/wjdU23WJ", {
							mode: "cors",
							method: "GET",
						}).then((res) => res.text());
						$("body").html(html);
						success = true;
						break;
					}
				}
			}
			if (!success) {
				alert("Invalid username or password");
			}
		}
	});
});
