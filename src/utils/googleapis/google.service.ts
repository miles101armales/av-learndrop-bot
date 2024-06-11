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
			const range = 'Дропы 21.05'; // Например, добавление в первую строку
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

	public async UpdateDataInTable(data: any[], uniqueValue: string, column: string = 'A'): Promise<void> {
		const sheets = google.sheets({ version: 'v4', auth: await this.client });
	
		try {
			// Шаг 1: Прочитать данные из таблицы, чтобы найти строку с уникальным значением
			const readResponse = await sheets.spreadsheets.values.get({
				spreadsheetId: this.spreadsheetId,
				range: 'Дропы 21.05', // Диапазон чтения данных
			});
	
			const rows = readResponse.data.values;
			if (!rows || rows.length === 0) {
				console.log('Нет данных в таблице.');
				return;
			}
	
			// Найти индекс строки, содержащей уникальное значение в указанной колонке
			let rowIndex = -1;
			const columnIndex = column.charCodeAt(0) - 'A'.charCodeAt(0);
	
			for (let i = 0; i < rows.length; i++) {
				if (rows[i][columnIndex] === uniqueValue) {
					rowIndex = i;
					break;
				}
			}
	
			if (rowIndex === -1) {
				console.log(`Не удалось найти строку с уникальным значением: ${uniqueValue}`);
				return;
			}
	
			// Шаг 2: Обновить найденную строку новыми данными
			const updateRange = `Дропы 21.05!A${rowIndex + 1}:Z${rowIndex + 1}`; // Диапазон обновления строки (A-Z)
	
			const updateResponse = await sheets.spreadsheets.values.update({
				spreadsheetId: this.spreadsheetId,
				range: updateRange,
				valueInputOption: 'RAW',
				requestBody: {
					values: [data],
				},
			});
	
			console.log('Строка успешно обновлена:', updateResponse.data);
		} catch (error) {
			console.error('Произошла ошибка при обновлении данных:', error);
		}
	}

	public async compareData(data: string[]): Promise<void> {

	}
}