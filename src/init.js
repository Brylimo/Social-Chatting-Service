import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

function publicRooms() {
	const {
		sockets: {
			adapter: {sids, rooms},
		}
	} = wsServer
	const publicRooms = [];
	rooms.forEach((_, key) => {
		if(sids.get(key) === undefined) {
			publicRooms.push(key);
		}
	});
	return publicRooms;
}

function countRoom(roomName) {
	return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

async function createRoom(roomInfo) {
	try{
		let room = await prisma.room.create({
			data: roomInfo
		})
		console.log(`create room: ${room}`);
	} catch (error){
		console.log(error);
	}
}

async function increaseParticipants(roomName) {
	try{
		let roomInfo = await prisma.room.findFirst({
			where: { roomName: roomName }
		})

		let room = await prisma.room.updateMany({
			where: { roomName : roomName },
			data: { participantsNum: (roomInfo.participantsNum + 1) }
		})

	} catch (error){
		console.log(error);
	}
}

async function reduceParticipants(roomName) {
	try{
		let roomInfo = await prisma.room.findFirst({
			where: { roomName: roomName }
		})

		let room = await prisma.room.updateMany({
			where: { roomName : roomName },
			data: { participantsNum: (roomInfo.participantsNum - 1) }
		})

	} catch (error){
		console.log(error);
	}
}

async function deleteRoom(roomName) {
	try{
		let room = await prisma.room.deleteMany({
			where: { roomName : roomName}
		})
		console.log("delete room");
		
	} catch (error){
		console.log(error);
	}
}

wsServer.on("connection", socket => {
	socket["nickname"] = "Anon";
	socket.onAny((event) => {
		console.log(`Socket Event:${event}`);
	});
	socket.on("count_room", (roomName) => {
		return countRoom(roomName);
	});
	socket.on("enter_room", (roomName) => {
		socket.join(roomName);
		socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
		wsServer.sockets.emit("room_change", publicRooms());
	});
	socket.on("new_message", (msg, room, done) => {
		socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
		done();
	});
	socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

httpServer.listen(PORT, handleListening);