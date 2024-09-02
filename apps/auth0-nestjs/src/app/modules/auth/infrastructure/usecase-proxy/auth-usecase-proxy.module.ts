import { Module } from "@nestjs/common";
import { AuthServiceModule } from "../services";
import { RESET_PASSWORD_USECASE_PROXY } from "./token/auth.usecase-proxy";
import { ResetPasswordUseCases } from "../../usecases/reset-password/reset-password.usecases";

@Module({
	imports: [AuthServiceModule],
	providers: [
		{
			provide: RESET_PASSWORD_USECASE_PROXY,
            useClass : ResetPasswordUseCases
		}
	]
})
export class AuthUseCaseProxyModule {}