import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const postSignup = async (req, res, next) => {
	const id = req.body.id;
	const pwd = req.body.password;
	
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

export const postLogin = async (req, res, next) => {
	const id = req.body.id;
	const password = req.body.password;

	try {
		const userData = await prisma.user.findUnique({
			where: { id }
		});
		if (!userData) {
			return res.sendStatus(400);
		}

		const match = await bcrypt.compare(password, userData.password);
		if (!match){
			return res.sendStatus(400);
		}
		return res.sendStatus(200);		

	} catch(error) {
		console.log(error);
		next(error);
	}	
}