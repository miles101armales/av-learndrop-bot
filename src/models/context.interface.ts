import { Context, Scenes } from 'telegraf';
import { WizardSessionData } from 'telegraf/typings/scenes';

export interface IBotSession extends Scenes.WizardSession<WizardSessionData> {
	username: string;
	name: string;
	chat_id: number;
	phoneToCall: string;
	learnState: boolean;
	question1: string;
	question2: string;
	question3: string;
	score: number;
}

export interface IBotContext extends Context {
	// will be available under `ctx.myContextProp`
	// declare session type
	session: IBotSession;
	// declare scene type
	scene: Scenes.SceneContextScene<IBotContext, Scenes.WizardSessionData>;
	// declare wizard type
	wizard: Scenes.WizardContextWizard<IBotContext>;
}