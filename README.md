# Remix Discussions

In this app we are going to build a social network out of 4 technologies:

- [Remix](https://remix.run/) for our web framework
- [Prisma](https://www.prisma.io/) for our database abstraction
- [Planet Scale](https://planetscale.com/) for our serverless database
- [Vercel](https://vercel.com) for our hosting environment

We will make a group discussion app. Users will be able to create an account with email and password. They will be able to create a group and add their friends to it. They will be able to post their thoughts to the group.

## Running In Development

There are two commands you need to run in two different terminals:

- `yarn dev`
- `yarn dev:db`

`yarn dev` starts the remix development server.

`yarn dev:db` starts the planetscale database. Pick the branch you want to work off of when you start the command.

This assumes you have `pscale` installed and you've logged in with the CLI.

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
