import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ExtractUserProperty = (data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	const user = request.user;
	console.log(request);
 
	return data ? user && user[data] : user;
};


export const GetUserContext = createParamDecorator(ExtractUserProperty);
