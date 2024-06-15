import { Markup, Scenes, Telegraf } from 'telegraf';
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
import { User } from './models/user.interface';
import { message1 } from './controllers/constants';

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
		this.bot = new Telegraf<IBotContext>(this.configService.get('API_LEARNDROP'));
		this.bot.use(
			new LocalSession({ database: 'sessions.json' })
			.middleware()
		);
	}

	async init() {
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
			this.loggerService.log('Bot init success');
			// const sessions = JSON.parse(fs.readFileSync('sessions.json', 'utf-8'));
			// this.loggerService.log('Количество пользователей ' + sessions.sessions.length)
			// const batchSize = 7;

			// for (let i = 0; i < sessions.sessions.length; i += batchSize) {
			// 	const batch = sessions.sessions.slice(i, i + batchSize);
			// 	const promises = batch.map(async (user: User) => {
			// 		if (user.data.dozhim2 === undefined) {
			// 			this.bot.telegram.sendPhoto(user.id, { source: './src/public/images/photo1.jpg',},
			// 				Markup.inlineKeyboard([
			// 					[Markup.button.url('Иду на мастер-класс', 'https://online.azat-valeev.ru/stslkript_tgt')]
			// 				]))
			// 			this.bot.telegram.sendMessage(user.id, message1, {parse_mode: 'HTML'})
			// 		}
			// 	})
			// 	await Promise.all(promises);
			// }
			// this.bot.command('dozhim', ctx => ctx.scene.enter('dozhim'))
		} catch (error) {
			this.loggerService.error(error);
		}
	}
}

const bot = new Bot(new ConfigService, new LoggerService);
bot.init();