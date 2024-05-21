import { Scenes, Telegraf } from 'telegraf';
import { IBotContext } from './models/context.interface';
import { Command } from './models/command.class';
import { Scene } from './models/scene.class';
import { ConfigService } from './utils/config/config.service';
import { LoggerService } from './utils/logger/logger.service';
import LocalSession from 'telegraf-session-local';
import { StartCommand } from './controllers/start.command';
import { LearnScene } from './controllers/learn.scene';
import { HelpCommand } from './controllers/help.command';
import { DozhimScene } from './controllers/dozhim.scene';
import * as fs from 'fs'

export class Bot {
	bot: Telegraf<IBotContext>;
	stage: any;
	commands: Command[] = [];
	scenes: Scene[] = [];
	scenesNames: Scenes.WizardScene<IBotContext>[] = [];

	constructor(
		private readonly configService: ConfigService,
		private readonly loggerService: LoggerService,
	) {
		this.bot = new Telegraf<IBotContext>(this.configService.get('API_TOKEN'));
		this.bot.use(
			new LocalSession({ database: 'sessions.json' })
			.middleware()
		);
	}

	init() {
		try {
			this.commands = [
				new StartCommand(this.bot),
				new HelpCommand(this.bot),
			];
			for (const command of this.commands) {
				command.handle();
			}

			this.scenes = [
				new LearnScene(this.bot),
				new DozhimScene(this.bot),
			];
			for (const scene of this.scenes) {
				scene.handle();
				this.scenesNames.push(scene.scene);
			}
			const stage = new Scenes.Stage(this.scenesNames);
			this.bot.use(stage.middleware());

			this.bot.launch();
			const sessions = JSON.parse(fs.readFileSync('sessions.json', 'utf-8'));
			// for (const session of sessions.sessions) {
			// 	this.bot.telegram.sendMessage(session.id, 'Добрый вечер!\n\nМы получили множество обращений и добавили уроки, для того чтобы понимать какие инстуркции вам необходимы. Нажмите кнопку ниже, чтобы просмотреть!', {
			// 		reply_markup: {
			// 			inline_keyboard: [
			// 				[{ text: 'Что там далее?', callback_data: 'dozhim' }]
			// 			]
			// 		}
			// 	})
			// 	// ctx.telegram.sendVideo(ctx.chat?.id, { source: './src/public/video/greeting.mp4' }, greeting);
			// }
			this.bot.action('dozhim', ctx => ctx.scene.enter('dozhim'))
			this.loggerService.log('Bot init success');
		} catch (error) {
			this.loggerService.error(error);
		}
	}
}

const bot = new Bot(new ConfigService, new LoggerService);
bot.init();