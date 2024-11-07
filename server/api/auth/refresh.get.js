import {getRefreshTokenByToken} from "~/server/db/refreshToken.js";
import {decodeRefreshToken} from "~/server/ultis/jwt.js";
import {getUserById} from "~/server/db/users.js";

export default defineEventHandler(async (event) => {
    console.log(useCookies(event));
    const refreshToken = getCookie(event, 'refresh_token');
    // console.log('refresh_token:', refreshToken);

    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken);
    // console.log('rToken:', rToken);

    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid',
        }));
    }

    const token = decodeRefreshToken(rToken);
    // console.log('token:', token)

    try {
        const user = getUserById(token.userId);
        // console.log('user:', user);

        return {
            user
        }
    } catch (e) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }));
    }
});