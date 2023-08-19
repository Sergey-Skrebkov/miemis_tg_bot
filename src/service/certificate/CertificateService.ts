import {CertificateDto} from "./CertificateDto";
import axios from 'axios';
import {ResponseError} from "../../exceptions/ResponseError";

export class CertificateService {
    public async addCertificateTaskToBitrix(): Promise<string> {
        const title = "Заголовок задачи";
        const description = "Текст задачи";

        const certificate: CertificateDto = new class implements CertificateDto {
            author = 295
            description = description
            responsible = 295
            title = title
        }

        const url = await this.generateTaskUri(certificate);

        try {
            await axios.get(url).then(() => {});
        } catch (err) {
            console.log(err)
            throw new ResponseError(`Что-то пошло не так, вы можете попробовать позже, 
            или воспользоваться формой https://forms.yandex.ru/u/622abeeec04cd51f912ea805/`)
        }
        return `Ваша справка будет готова в течении двух рабочих недель.`
    }

    private async generateTaskUri(certificate: CertificateDto): Promise<string> {
        const {BITRIX_API} = process.env
        const method = "task.item.add.json?";
        const params = new URLSearchParams();
        params.append("TASKDATA[TITLE]", certificate.title);
        params.append("TASKDATA[DESCRIPTION]", certificate.description);
        params.append("TASKDATA[CREATED_BY]", certificate.author.toString()); //Проверить перед тестированием
        params.append("TASKDATA[RESPONSIBLE_ID]", certificate.responsible.toString());

        return BITRIX_API + method + params.toString();
    }

}