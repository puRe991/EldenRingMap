import { rest } from 'msw';
import type { ResponseComposition, RestContext, RestRequest } from 'msw';

const ipResponse = (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(
        ctx.json({
            ip: 'localhost',
        }),
        ctx.status(200),
    )
};

export default [
    rest.post('/api/isRequest.php', ipResponse),
    rest.get('/api/ipRequest.php', ipResponse),
]
