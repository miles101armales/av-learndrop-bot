import { IBotContext } from '../../models/context.interface';

export class DatabaseService {
	handleBlockedUser(ctx: IBotContext) {
		localSession.DB.remove(ctx.chat.id.toString());
		console.log(`Пользователь с ID ${ctx.chat.id} был удален из базы данных.`);
	}
}