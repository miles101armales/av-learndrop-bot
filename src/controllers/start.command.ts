import { Command } from '../models/command.class';

export class StartCommand extends Command {
	handle(): void {
		this.bot.start((ctx) => {
			ctx.sendMessage('Введите пожалуйста номер телефона, чтобы открыть доступ и далее получить информацию о дропах и инструкцию');
			this.bot.hears(/^\+?[0-9]{1,3}[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}$/, (ctx) => {
				ctx.session.phoneToCall = ctx.msg.text;
				ctx.scene.enter('learn');
			});
		})
	}

}