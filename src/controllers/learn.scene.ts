import { IBotContext } from '../models/context.interface';
import { Scene } from '../models/scene.class';
import { Composer, Scenes, Telegraf } from 'telegraf';

export class LearnScene extends Scene {
	state: string;
	scene: Scenes.WizardScene<IBotContext>
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
	}
	handle(): void {
		const stepHandlerforVideo = new Composer<IBotContext>();
		stepHandlerforVideo.action('0100', ctx => {
			ctx.reply('Загрузка...');
			ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video1.MP4' }, {
				reply_markup: {
					inline_keyboard: [[{text: 'ПРОСМОТРЕНО✅', callback_data: 'watch1_complete'}]]
				},
				width: 720,
				height: 1280,
				caption: '☝️ Посмотрите скорее видео, Виталий простым языком расскажет:' +
				'\n\n1️⃣ Секрет, который не вошел в эфир' +
				'\n2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)' +
				'\n3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности' +
				'\n\nПосле завершения видео нажмите кнопку ниже'
			});
			ctx.wizard.next();
		});
		stepHandlerforVideo.action('100500', ctx => {
			ctx.reply('Загрузка...');
			ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video2.MP4' }, {
				reply_markup: {
					inline_keyboard: [[{text: 'ПРОСМОТРЕНО✅', callback_data: 'watch1_complete'}]]
				},
				width: 720,
				height: 1280,
				caption: '☝️ Посмотрите скорее видео, Виталий простым языком расскажет:' +
				'\n\n1️⃣ Секрет, который не вошел в эфир' +
				'\n2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)' +
				'\n3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности' +
				'\n\nПосле завершения видео нажмите кнопку ниже'
			});
			ctx.wizard.next();
		});
		stepHandlerforVideo.action('5001000', ctx => {
			ctx.reply('Загрузка...');
			ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video3.MP4' }, {
				reply_markup: {
					inline_keyboard: [[{text: 'ПРОСМОТРЕНО✅', callback_data: 'watch1_complete'}]]
				},
				width: 720,
				height: 1280,
				caption: '☝️ Посмотрите скорее видео, Виталий простым языком расскажет:' +
				'\n\n1️⃣ Секрет, который не вошел в эфир' +
				'\n2️⃣ Какие проекты вы можете использовать, чтобы заработать на дропах (инфа из платного курса!)' +
				'\n3️⃣ Как прямо сейчас получить инструкцию напрямую от нашей команды под ваш бюджет и возможности' +
				'\n\nПосле завершения видео нажмите кнопку ниже'
			});
			ctx.wizard.next();
		});

		const stepHandlerforAnswerTwo = new Composer<IBotContext>();
		stepHandlerforAnswerTwo.action('0k50k', ctx => {
			ctx.session.question1 = 'от 0 до 50 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerTwo.action('50k100k', ctx => {
			ctx.session.question1 = 'от 50 000 до 100 000 тысяч рублей';
			ctx.wizard.next();
		});
		stepHandlerforAnswerTwo.action('100k+', ctx => {
			ctx.session.question1 = 'от 100 000 тысяч рублей';
			ctx.wizard.next();
		});

		const stepHandlerforAnswerThree = new Composer<IBotContext>();
		stepHandlerforAnswerThree.action('15min', ctx => {
			ctx.session.question1 = 'до 15 минут в день';
			ctx.wizard.next();
		});
		stepHandlerforAnswerThree.action('1hour', ctx => {
			ctx.session.question1 = 'до часа в день';
			ctx.wizard.next();
		});
		stepHandlerforAnswerThree.action('1hour+', ctx => {
			ctx.session.question1 = 'больше часа в день';
			ctx.wizard.next();
		});

		this.scene = new Scenes.WizardScene(
			'learn',
			async ctx => {
				ctx.replyWithHTML('Ваш урок уже грузится!\n\nА пока ответьте на вопрос: <b>Какую сумму вы собираетесь использовать для работы с дропами?</b>', {
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
			stepHandlerforVideo,
			async ctx => {
				ctx.replyWithHTML('Следующий урок уже грузится!\n\nА пока ответьте на вопрос: <b>Сколько вы хотите заработать на дропах?</b>', {
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
				ctx.reply('Загрузка...');
				ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/video4.MP4' }, {
					reply_markup: {
						inline_keyboard: [[{text: 'ПРОСМОТРЕНО✅', callback_data: 'watch1_complete'}]]
					},
					width: 720,
					height: 1280,
					caption: '☝️ Посмотрите финальное видео',
				});
				ctx.wizard.next();
			},
			async ctx => {
				ctx.replyWithHTML('Спасибо, что просмотрели уроки!\n\nНа основе полученной информации поделитесь пока ответьте на вопрос: <b>Сколько времени вы готовы уделять?</b>', {
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
				ctx.reply('Спасибо, что уделили время. Для дополнительной консультации и записи на персональную консультацию звоните +79871011090');
				ctx.scene.leave();
			}
		);
	}

}