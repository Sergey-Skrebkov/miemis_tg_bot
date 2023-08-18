import {IConfigService} from "./IConfigService";

export class ConfigService implements IConfigService{

    constructor() {

    }

    getBotToken(): string {
        const {TG_TOKEN} = process.env
        return TG_TOKEN;
    }

    getBotName(): string {
        const {TG_NAME} = process.env
        return TG_NAME;
    }


}