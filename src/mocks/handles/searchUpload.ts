import { rest } from 'msw';

export default [
    rest.post('/api/searchUpload.php', (_req, res, ctx) => {
        return res(
            ctx.json(true),
            ctx.status(200),
        )
    }),
]