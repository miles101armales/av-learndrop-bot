import { Bot } from '../app';
import { Command } from '../models/command.class';
import { ConfigService } from '../utils/config/config.service';
import { LoggerService } from '../utils/logger/logger.service';

export class StartCommand extends Command {
	handle(): void {
		try {
			this.bot.start((ctx) => {
				ctx.sendMessage('Введите пожалуйста номер телефона, чтобы открыть доступ и далее получить информацию о дропах и инструкцию');
				this.bot.hears(/^\+?[0-9]{1,3}[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}$/, (ctx) => {
					ctx.session.phoneToCall = ctx.msg.text;
					ctx.scene.enter('learn');
				});
			})
		} catch (error) {
			const bot = new Bot(new ConfigService, new LoggerService);
			bot.init();
		}
	}

}