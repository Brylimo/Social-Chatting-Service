import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const postSignup = async (req, res, next) => {
	const id = req.body.id;
	const pwd = String(req.body.password);
	
	try {
		const userExist = await prisma.user.findFirst({
			where: { id }
		});

		if (userExist) {
			return res.sendStatus(400);
		}

		const password = await bcrypt.hash(pwd, 5);
		let userInfo = {
			id,
			password
		}
		
		await prisma.user.create({
			data: userInfo
		})
		return res.sendStatus(200);
	} catch(error) {
		console.log(error);
		next(error);
	}
}