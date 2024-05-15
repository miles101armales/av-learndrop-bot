import { IBotContext } from '../../models/context.interface';
import { TelegramError } from 'telegraf';
import error from 'telegraf/typings/core/network/error';

export class ExceptionFilter {
	handle(error: any) {
		if (error instanceof TelegramError) {
			if (error.code === 403) {
			console.error('Бот был заблокирован пользователем');
		} else {
			console.error('Произошла ошибка при отправке сообщения:', error);
		}
		} else {
			console.error('Неизвестная ошибка:', error);
		}
	}
}