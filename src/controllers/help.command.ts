import { Command } from '../models/command.class';
import { about } from './constants';

export class HelpCommand extends Command {
	handle(): void {
		this.bot.help(ctx => {
			ctx.replyWithHTML(about, {
				reply_markup: {
					inline_keyboard: [[{ text: 'Уроки', callback_data: 'learn'}]]
				}
			})

			this.bot.action('learn', ctx => {
				ctx.scene.enter('learn');
			})
		})
	}
}