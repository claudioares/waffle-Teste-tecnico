import { IOpeningWebhook, IUserLogin } from "../interfaces/interfaces";
import { methodsRepositorie } from "../repositorie/methods.repositorie";
import { z } from "zod";

export class MethodsUseCase {
    private repositorie: methodsRepositorie;
    constructor () {
        this.repositorie = new methodsRepositorie();
    };


    async create(data: IOpeningWebhook) {

        const OpeningWebhookSchema = z.object({
            email: z.string(),
            postId: z.string().optional(),
            utmSource: z.string().optional(),
            utmMedium: z.string().optional(),
            utmCampaign: z.string().optional(),
            utmChannel: z.string().optional(),
        });


        const _data = OpeningWebhookSchema.parse(data);
        if ( !_data.email ) {
            throw new Error("Email is necessary.");
        }

        const verifyEmailExists = await this.repositorie.verifyUser(_data.email);
        if (verifyEmailExists) {
            return { message: "Email already exists." };
        }

        const newData = {
            email: _data.email,
            postId: _data.postId,
            utmSource: _data.utmSource,
            utmMedium: _data.utmMedium,
            utmCampaign: _data.utmCampaign,
            utmChannel: _data.utmChannel,
        }

        const result = await this.repositorie.create(newData);

        return result;
    };

    async login({ email }: IUserLogin) {
        const isEmailPresentSchema = z.object({
            email: z.string(),
        });

        const _email = isEmailPresentSchema.parse({ email });
        if (!_email.email) {
            throw new Error("Email is necessary.");
        };

        const verifyEmail = await this.repositorie.verifyUser(email);
        if(!verifyEmail) {
            throw new Error("Email not found.");
        };

        const result = await this.repositorie.login({ email });

        return result;
    }
}