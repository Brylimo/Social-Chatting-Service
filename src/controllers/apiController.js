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
		req.session.loggedIn = true;
		req.session.user = userData;
		return res.sendStatus(200);		

	} catch(error) {
		console.log(error);
		next(error);
	}	
}

export const getUser = async (req, res, next) => {
	const user = req.session.user;
	
	try {
		return res.status(200).json({ id: user.id, userId: user.userId });
	} catch(error) {
		console.log(error);
		next(error);
	}	
}

export const getRoom = async (req, res, next) => {
	const roomName = req.query.roomName;

	try {
		const room = await prisma.room.findFirst({
			where: { roomName }
		});
		if (room) {
			return res.status(200).json({ room });
		} else {
			return res.sendStatus(201);
		}		
	} catch(error) {
		console.log(error);
		next(error);
	}
}

export const createRoom = async (req, res, next) => {
	const { roomName } = req.body;

	try {
		let roomInfo = {
			roomName,
			participantsNum: 0,
		};
		const room = await prisma.room.create({
			data: roomInfo
		});
		return res.status(200).json({ room });
	} catch(error) {
		console.log(error);
		next(error);
	}
}

export const patchRoom = async (req, res, next) => {
	let room = {
		participantsNum: req.body.participantsNum
	}
	
	try {
		await prisma.room.update({
			where: { roomName: req.body.roomName },
			data: room,
		});
		return res.sendStatus(200);
	} catch(error) {
		console.log(error);
		next(error);
	}
}

export const getAllUser = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany({
			where: { 
				NOT: {
					id: req.session.user.id,					
				}
			 }
		});
		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		next(error);
	}
}

export const postFollow = async (req, res, next) => {
	const { fromId, toId } = req.body;

	try {
		let followerInfo = {
			fromId: parseInt(fromId),
			toId: parseInt(toId)
		};
		
		await prisma.follower.create({
			data: followerInfo
		}); 	
		return res.status(200);
	} catch (error) {
		console.log(error);
		next(error);
	}
}