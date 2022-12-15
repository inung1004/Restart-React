import { rest } from "msw";

const url = process.env.REACT_APP_BASE_URL;

export const handlers = [
  rest.get(`/login`, async (req, res, ctx) => {
    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),
  rest.get(`${url}`, async (req, res, ctx) => {
    const id = req.url.searchParams.get("id");

    const originalResponse = await ctx.fetch(req);
    const originalResponseData = await originalResponse.json();

    return res(
      // ctx.status(403),
      // ctx.json({
      //   errorMessage: `Data not Found`,
      // })
      ctx.json({
        data: {
          people: [
            ...originalResponseData.data.people,
            {
              name: id,
              age: 17,
            },
          ],
        },
      })
    );
  }),
];
