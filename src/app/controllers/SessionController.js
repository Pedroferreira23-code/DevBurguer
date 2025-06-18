import * as yup from "yup";

import { response } from "express";
import User from "../models/User";

class SessionController {
	async store(request, response) {
		const schema = yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required().min(10),
		});
		const isValid = await schema.isValid(request.body);

		const emailOrPasswordIncorrect = () => {
			return response
				.status(401)
				.json({ error: "make sure your email or password are correct" });
		};
		if (!isValid) {
			emailOrPasswordIncorrect();
		}

		const { email, password } = request.body;

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			emailOrPasswordIncorrect();
		}

		const isSamePassword = await user.checkPassword(password);

		if (!isSamePassword) {
			emailOrPasswordIncorrect();
		}

		return response.status(201).json({
			id: user.id,
			name: user.name,
			email,
			admin: user.admin,
		});
	}
}

export default new SessionController();
