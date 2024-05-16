import { IBotContext } from '../models/context.interface';
import { Scene } from '../models/scene.class';
import { Composer, Scenes, Telegraf, TelegramError } from 'telegraf';
import { final, greeting, video0_5000, video10000, video5000_10000 } from './constants';
import { Bot } from '../app';
import { ConfigService } from '../utils/config/config.service';
import { LoggerService } from '../utils/logger/logger.service';
import { ExceptionFilter } from '../utils/error/exception.service';
import * as fs from 'fs';
import { GoogleApi } from '../utils/googleapis/google.service';

export class LearnScene extends Scene {
	state: string;
	scene: Scenes.WizardScene<IBotContext>
	exceptionFilter: ExceptionFilter;
	googleapi: GoogleApi;
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
		this.exceptionFilter = new ExceptionFilter()
		this.googleapi = new GoogleApi()
	}
	handle(): void {
			const stepHandlerforAnswerOne = new Composer<IBotContext>();
			stepHandlerforAnswerOne.action('0100', ctx => {
				try {
					ctx.session.question1 = 'от 0 до 5 000 РУБ';
					ctx.replyWithHTML('Ваш урок уже формируется!\n\nОтветьте на вопрос: <b>Сколько вы хотите заработать на дропах?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'от 0 до 50 000 РУБ', callback_data: '0k50k'}],
								[{ text: 'от 50 000 до 100 000 РУБ', callback_data: '50k100k' }],
								[{ text: 'от 100 000 РУБ', callback_data: '100k+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerOne.action('100500', ctx => {
				try {
					ctx.session.question1 = 'от 5 000 до 25 000 РУБ';
					ctx.replyWithHTML('Ваш урок уже формируется!\n\nОтветьте на вопрос: <b>Сколько вы хотите заработать на дропах?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'от 0 до 50 000 РУБ', callback_data: '0k50k'}],
								[{ text: 'от 50 000 до 100 000 РУБ', callback_data: '50k100k' }],
								[{ text: 'от 100 000 РУБ', callback_data: '100k+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerOne.action('5001000', ctx => {
				try {
					ctx.session.question1 = 'от 25 000 РУБ';
					ctx.replyWithHTML('Ваш урок уже формируется!\n\nОтветьте на вопрос: <b>Сколько вы хотите заработать на дропах?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'от 0 до 50 000 РУБ', callback_data: '0k50k'}],
								[{ text: 'от 50 000 до 100 000 РУБ', callback_data: '50k100k' }],
								[{ text: 'от 100 000 РУБ', callback_data: '100k+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});

			const stepHandlerforAnswerTwo = new Composer<IBotContext>();
			stepHandlerforAnswerTwo.action('0k50k', ctx => {
				try {
					ctx.session.question2 = 'от 0 до 50 000 тысяч рублей';
					ctx.replyWithHTML('Урок уже почти сформирован!\n\nОтветьте на вопрос: <b>Сколько времени вы готовы уделять дропам?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'до 15 минут в день', callback_data: '15min'}],
								[{ text: 'до 1 часа в день', callback_data: '1hour' }],
								[{ text: 'больше 1 часа в день', callback_data: '1hour+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerTwo.action('50k100k', ctx => {
				try {
					ctx.session.question2 = 'от 50 000 до 100 000 тысяч рублей';
					ctx.replyWithHTML('Урок уже почти сформирован!\n\nОтветьте на вопрос: <b>Сколько времени вы готовы уделять дропам?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'до 15 минут в день', callback_data: '15min'}],
								[{ text: 'до 1 часа в день', callback_data: '1hour' }],
								[{ text: 'больше 1 часа в день', callback_data: '1hour+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerTwo.action('100k+', ctx => {
				try {
					ctx.session.question2 = 'от 100 000 тысяч рублей';
					ctx.replyWithHTML('Урок уже почти сформирован!\n\nОтветьте на вопрос: <b>Сколько времени вы готовы уделять дропам?</b>', {
						reply_markup: {
							inline_keyboard: [
								[{ text: 'до 15 минут в день', callback_data: '15min'}],
								[{ text: 'до 1 часа в день', callback_data: '1hour' }],
								[{ text: 'больше 1 часа в день', callback_data: '1hour+' }]
							]
						}
					}),
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});

			const stepHandlerforAnswerThree = new Composer<IBotContext>();
			stepHandlerforAnswerThree.action('15min', ctx => {
				try {
					ctx.session.question3 = 'до 15 минут в день';
					ctx.reply('Урок сформирован! Нажмите, чтобы получить ⬇️', {
						reply_markup: {
							inline_keyboard: [[{text: 'ПОЛУЧИТЬ', callback_data: 'complete'}]]
						}
					})
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerThree.action('1hour', ctx => {
				try {
					ctx.session.question3 = 'до часа в день';
					ctx.reply('Урок сформирован! Нажмите, чтобы получить ⬇️', {
						reply_markup: {
							inline_keyboard: [[{text: 'ПОЛУЧИТЬ', callback_data: 'complete'}]]
						}
					})
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});
			stepHandlerforAnswerThree.action('1hour+', ctx => {
				try {
					ctx.session.question3 = 'больше часа в день';
					ctx.reply('Урок сформирован! Нажмите, чтобы получить ⬇️', {
						reply_markup: {
							inline_keyboard: [[{text: 'ПОЛУЧИТЬ', callback_data: 'complete'}]]
						}
					})
					ctx.wizard.next();
				} catch (error) {
					this.exceptionFilter.handle(error)
				}
			});

			this.scene = new Scenes.WizardScene(
				'learn',
				ctx => {
					try {
						ctx.reply('Загрузка информации по действующим дропам...')
						ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/greeting.mp4' }, greeting);
						ctx.wizard.next();
					} catch (error) {
						this.exceptionFilter.handle(error)
					}
				},
				ctx => {
					try {
						ctx.replyWithHTML('Ответьте на вопрос: <b>Какую сумму вы собираетесь использовать для работы с дропами?</b>', {
							reply_markup: {
								inline_keyboard: [
									[{ text: 'от 0 до 5 000 РУБ', callback_data: '0100'}],
									[{ text: 'от 5 000 до 25 000 РУБ', callback_data: '100500' }],
									[{ text: 'от 25 000 РУБ', callback_data: '5001000' }]
								]
							}
						}),
						ctx.wizard.next();
					} catch (error) {
						// Handle the error appropriately
						if (error instanceof TelegramError && error.code === 403) {
							// Log the error or handle it in some way
							console.error('TelegramError 403 Forbidden:', error.description);
						} else {
							// For other types of errors, you can use your exception filter
							this.exceptionFilter.handle(error);
						}
					}
				},
				stepHandlerforAnswerOne,
				stepHandlerforAnswerTwo,
				stepHandlerforAnswerThree,
				ctx => {
					try {
						switch (ctx.session.question1) {
							case 'от 0 до 5 000 РУБ':
								ctx.reply('Загрузка...');
								ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video1.mp4' }, video0_5000);
								ctx.wizard.next();
								break;
	
							case 'от 5 000 до 25 000 РУБ':
								ctx.reply('Загрузка...');
								ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video2.mp4' }, video5000_10000);
								ctx.wizard.next();
								break;
	
							case 'от 25 000 РУБ':
								ctx.reply('Загрузка...');
								ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video3.mp4' }, video10000);
								ctx.wizard.next();
								break;
						
							default:
								break;
						}
					} catch (error) {
						this.exceptionFilter.handle(error)
					}
				},
				ctx => {
					try {
						ctx.reply('Загрузка...');
						ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/final.mp4' }, final);
						const pollResult: string [][] = [];
						const data = [
							ctx.session.username,
							ctx.session.name,
							ctx.session.phoneToCall,
							ctx.session.question1,
							ctx.session.question2,
							ctx.session.question3
						];
						pollResult.push(data);
						const spreadsheet = JSON.parse(fs.readFileSync('spreadsheet.json', 'utf-8'));
						this.googleapi.writeDataToTable(pollResult, spreadsheet.spreadsheetId);
						ctx.scene.leave();
					} catch (error) {
						this.exceptionFilter.handle(error)
					}
				}
			);
	}

}