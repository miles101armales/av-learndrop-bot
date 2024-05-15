import { IBotContext } from '../models/context.interface';
import { Scene } from '../models/scene.class';
import { Composer, Scenes, Telegraf } from 'telegraf';
import { final, greeting, video0_5000, video10000, video5000_10000 } from './constants';

export class LearnScene extends Scene {
	state: string;
	scene: Scenes.WizardScene<IBotContext>
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}
	handle(): void {
		const stepHandlerforAnswerOne = new Composer<IBotContext>();
		stepHandlerforAnswerOne.action('0k50k', ctx => {
			ctx.session.question1 = 'от 0 до 50 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerOne.action('50k100k', ctx => {
			ctx.session.question1 = 'от 50 000 до 100 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerOne.action('100k+', ctx => {
			ctx.session.question1 = 'от 100 000 тысяч рублей';
			ctx.wizard.next();
		});

		const stepHandlerforAnswerTwo = new Composer<IBotContext>();
		stepHandlerforAnswerTwo.action('0k50k', ctx => {
			ctx.session.question2 = 'от 0 до 50 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerTwo.action('50k100k', ctx => {
			ctx.session.question2 = 'от 50 000 до 100 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerTwo.action('100k+', ctx => {
			ctx.session.question2 = 'от 100 000 тысяч рублей';
			ctx.wizard.next();
		});

		const stepHandlerforAnswerThree = new Composer<IBotContext>();
		stepHandlerforAnswerThree.action('15min', ctx => {
			ctx.session.question3 = 'до 15 минут в день';
			ctx.wizard.next();
		});
		stepHandlerforAnswerThree.action('1hour', ctx => {
			ctx.session.question3 = 'до часа в день';
			ctx.wizard.next();
		});
		stepHandlerforAnswerThree.action('1hour+', ctx => {
			ctx.session.question3 = 'больше часа в день';
			ctx.wizard.next();
		});

		this.scene = new Scenes.WizardScene(
			'learn',
			async ctx => {
				ctx.reply('Загрузка информации по действующим дропам...')
				ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/greeting.mp4' }, greeting);
				ctx.wizard.next();
			},
			async ctx => {
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
			},
			stepHandlerforAnswerOne,
			async ctx => {
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
			},
			stepHandlerforAnswerTwo,
			async ctx => {
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
			},
			stepHandlerforAnswerThree,
			async ctx => {
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
			},
			async ctx => {
				ctx.reply('Загрузка...');
				ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/final.mp4' }, final);
				ctx.scene.leave();
			}
		);
	}

}