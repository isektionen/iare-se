# IARE.SE

## Production

Visit either:

* <https://www.iare.se>
* <https://iare-se.vercel.app>

## Development

### Prerequisite

* Node 14.17.1+
* Npm 6.14.13+ OR yarn 1.22.10+

### Build for dev

1. Clone down this repository
2. Install dependencies using `npm install` OR `yarn`
3. Update the Graphql types with `npm run generate` OR `yarn generate`
4. Run `npm run prefetch` to generate static content
5. Run dev server using `npm run dev` OR `yarn dev`
6. if your OS didn't open a browser tab for you, then open a browser and navigate to `localhost:3000`
7. Make sure you are not developing on the production branch `main` - but instead specify a new branch by either doing it in your IDE of choice, or via the terminal `git switch -c <new_feature>`

Before merging to `main`, make sure your branch gets built by `npm run build` OR `yarn build`.

### Frameworks/technologies to familiarize on your own

 1. React (functional components) <https://reactjs.org/docs/hello-world.html>
    1. useState
    2. useEffect
    3. useRefs
    4. custom hooks
 2. Next.js <https://nextjs.org/docs/getting-started>
 3. Graphql <https://www.apollographql.com/docs/apollo-server>
 4. Recoil.js <https://recoiljs.org/docs/introduction/installation>
 5. Typescript <https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html>

### Structure

The frontend is built with MVC in mind, where we have detached the models, views and controllers into their own files.

__Models__ are located at `src/models` - and is mainly fetches from the backend server and aggregations.

__Views__ are located at `src/views` - and is the main container of all other components for the specific view. If you want to change the appearance or state of a page, this is where you do it. Please add your own components to `src/components` instead of having them in the view.

__Controller__ are located at `src/pages`, `src/state` and `src/hooks`. Pages are only for connecting the view and controller, whereas state and hooks acts as controllers of the client rendered site.
