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
3. Run dev server using `npm run dev` OR `yarn dev`
4. if your OS didn't open a browser tab for you, then open a browser and navigate to `localhost:3000`
5. Make sure you are not developing on the production branch `main` - but instead specify a new branch by either doing it in your IDE of choice, or via the terminal `git switch -c <new_feature>`

Before merging to `main`, make sure your branch gets built by `npm run build` OR `yarn build`.
