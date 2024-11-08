import { getUserByUsername } from "~/server/db/users.js";
import bcrypt from "bcrypt";
import {generateTokens, sendRefreshToken} from "~/server/ultis/jwt.js";
import {userTransformer} from "~/server/transformers/users.js";
import {createRefreshToken} from "~/server/db/refreshToken.js";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, password } = body;

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }));
    }

    const user = await getUserByUsername(username);

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }));
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }));
    }

    const { accessToken, refreshToken } = generateTokens(user)
    await createRefreshToken({
        token: refreshToken,
        userId: user.id,
    });
    sendRefreshToken(event, refreshToken);

    return {
        accessToken,
        user: userTransformer(user),
    };
});