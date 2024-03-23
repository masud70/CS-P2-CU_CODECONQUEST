const { getRandomChars, sendMail } = require("../helper");
const db = require("../models");

module.exports = {
	createUser: async ({ email }) => {
		try {
			const passString = "QWERTYUIOPLKJHGFDSAZXCVBNM1209348756";
			const password = getRandomChars(passString, 6);

			const user = await db.User.findAll({ where: { email: email } });

			if (user.length == 0) {
				const createUser = await db.User.create({
					email: email,
					password: password,
				});

				if (createUser) {
					const body = {
						text: "",
						html: `<p>An admin has created a new account for you. Below is your account credentials.</p><h2>Email: ${email} <br>Password: ${password}</h2>`,
					};

					const emailResult = await sendMail({
						email: email,
						body: body,
					});
					console.log(emailResult);
                    
					if (emailResult.success) {
						return {
							success: true,
							message:
								"User created successfully! Ask the user to check email.",
						};
					} else {
						await createUser.destroy();
						throw new Error(emailResult.message);
					}
				} else {
					throw new Error("User creation failed!");
				}
			} else {
				throw new Error("User already exists!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},
};
