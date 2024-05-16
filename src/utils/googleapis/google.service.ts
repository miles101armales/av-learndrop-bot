import { OAuth2Client } from 'google-auth-library';
import { ICredentials } from './credentials.interface';
import * as fs from 'fs';
import { google } from 'googleapis';

export class GoogleApi {
	client: OAuth2Client;
	spreadsheetId: string;
	constructor() {
		const credentials: ICredentials = JSON.parse(fs.readFileSync('credentials.json', 'utf-8'));
		try {
			// Аутентификация с использованием учетных данных
			const auth = new google.auth.GoogleAuth({
				credentials: {
					client_email: credentials.client_email,
					private_key: credentials.private_key,
				},
				scopes: [
					'https://www.googleapis.com/auth/spreadsheets',
					'https://www.googleapis.com/auth/drive',
				],
			});
			//Вызов метода инициализации клиента
			this.initializeClient(auth);
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	}
	//Метод инициализации клиента
	private async initializeClient(auth: any): Promise<void> {
		try {
			this.client = await auth.getClient();
		} catch (error) {
			console.error('Произошла ошибка при инициализации клиента:', error);
		}
	}
	public async writeDataToTable(data: any[], spreadsheetId: any): Promise<void> {
		const sheets = google.sheets({ version: 'v4', auth: await this.client });
		try {
			// await sheets.spreadsheets.values.clear({
			// 	spreadsheetId,
			// 	range: 'Дропы 16.05' // Range covering all columns from A to B (adjust as needed)
			// });
			// Диапазон в таблице, куда вы хотите добавить данные
			const range = 'Дропы 16.05'; // Например, добавление в первую строку
			// Выполнение запроса на добавление данных
			const response = await sheets.spreadsheets.values.append({
				spreadsheetId,
				range,
				valueInputOption: 'RAW',
				requestBody: {
					values: data,
				},
				
			});
			console.log('Данные успешно добавлены:', response.data);
		} catch (error) {
			console.error('Произошла ошибка при добавлении данных:', error);
		}
	}

	public async compareData(data: string[]): Promise<void> {

	}
}