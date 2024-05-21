import { IBotContext } from '../models/context.interface';
import { Composer, Scenes, Telegraf } from 'telegraf';
import { Scene } from '../models/scene.class';
import { GoogleApi } from '../utils/googleapis/google.service';
import * as fs from 'fs';

export class DozhimScene extends Scene {
	state: string;
	scene: Scenes.WizardScene<IBotContext>
	googleapi: GoogleApi;
	
	constructor(bot: Telegraf<IBotContext>) {
		super(bot);
		this.googleapi = new GoogleApi()
	}
	handle(): void {
		const stepHandler1 = new Composer<IBotContext>;
		stepHandler1.action('projects', ctx => {
			ctx.session.dozhim1 = 'Хочу проекты'
			ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/dozhim3.mp4' }, {
				width: 720,
				height: 1280,
				caption: 'Выберите вашу ситуацию',
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Забрать свое', callback_data: 'call' }]
					]
				}
			});
			ctx.wizard.next();
		})
		stepHandler1.action('situation', ctx => {
			ctx.session.dozhim1 = 'Хочу разбор ситуации'
			ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/dozhim3.mp4' }, {
				width: 720,
				height: 1280,
				caption: 'Выберите вашу ситуацию',
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Забрать свое', callback_data: 'call' }]
					]
				}
			});
			ctx.wizard.next();
			
		})
		this.scene = new Scenes.WizardScene(
			'dozhim',
			ctx => {
				ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/dozhim2.mp4' }, {
					width: 720,
					height: 1280,
					caption: 'Выберите вашу ситуацию',
					reply_markup: {
						inline_keyboard: [
							[{ text: 'Хочу проекты🧩', callback_data: 'projects' }],
							[{ text: 'Хочу разбор ситуации🙏', callback_data: 'situation' }]
						]
					}
				});
				ctx.wizard.next();
			},
			stepHandler1,
			ctx => {
				ctx.reply('Ожидайте звонка от специалиста по указанному вами номеру😊.\n\nИмена наших специалистов:\nЕкатерина⚡\n\nСергей⚡\n\nТимофей⚡')
				const pollResult: string [][] = [];
				const data = [
					ctx.session.name,
					ctx.session.username,
					ctx.session.dozhim1,
					'Дошел до конца'
				]
				pollResult.push(data);
				const spreadsheet = JSON.parse(fs.readFileSync('spreadsheet.json', 'utf-8'));
				this.googleapi.writeDataToTable(pollResult, spreadsheet.spreadsheetId);
				ctx.scene.leave();
			}
		)
	}

}