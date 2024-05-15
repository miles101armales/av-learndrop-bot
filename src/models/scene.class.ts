import { Telegraf } from 'telegraf';
import { WizardScene } from 'telegraf/typings/scenes';
import { IBotContext } from './context.interface';

export abstract class Scene {
	public scene: WizardScene<IBotContext>
	constructor(public bot: Telegraf<IBotContext>) {}

	abstract handle(): void;
}