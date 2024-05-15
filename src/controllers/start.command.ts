import { ExceptionFilter } from '../utils/error/exception.service';
import { Bot } from '../app';
import { Command } from '../models/command.class';
import { ConfigService } from '../utils/config/config.service';
import { LoggerService } from '../utils/logger/logger.service';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../models/context.interface';

export class StartCommand extends Command {
	exceptionFilter: ExceptionFilter;
	constructor(bot: Telegraf<IBotContext>) {
		super(bot)
		this.exceptionFilter = new ExceptionFilter()
	}
	handle(): void {
		this.bot.start((ctx) => {
			try {
				ctx.sendMessage('Введите пожалуйста номер телефона, чтобы открыть доступ и далее получить информацию о дропах и инструкцию\n\nЕсли вы не получили ответа, проверьте корректность введеного вами номера');
				this.bot.hears(/^\+?[0-9]{1,3}[ -]?\(?[0-9]{3}\)?[ -]?[0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{2}$/, (ctx) => {
					try {
						ctx.session.phoneToCall = ctx.msg.text;
						ctx.scene.enter('learn');
					} catch (error) {
						this.exceptionFilter.handle(error);
					}
				});
			} catch (error) {
				this.exceptionFilter.handle(error);
			}
		})
	}

}