import { rest } from 'msw';

export default [
    rest.post('/api/isRequest.php', (_req, res, ctx) => {
        return res(
            ctx.json({
                ip: 'localhost',
            }),
            ctx.status(200),
        )
    }),
]