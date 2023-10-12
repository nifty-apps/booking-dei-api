import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/schemas/user.schema';

export const CurrentUser = createParamDecorator(
  (data: keyof Omit<User, 'password'>, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (data) return user[data];
    return user;
  },
);
