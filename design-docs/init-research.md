# Initial Research
## What Does LinkTree Look like
LinkTree's link cards are pretty straight-forwards, they have a header element and then a list of links rendered as buttons underneath. The cards use a single column layout so it's responsive by default. The admin side is pretty straight-forwards, you can add, reorder and edit links. You can also hide or show them and there's several other tabs for settings for that card. In addition there's a preview panel on the right with a phone svg to see how the page looks on mobile.

## Link pamphlet creation
Probably make the same layout as LinkTree except PRO options and general authentication related things(at least for now). Maybe also give the option of choosing buton color.

## Pamphlet Routing
Next has a link component and allows for URL slugs so you can route to `/usr/[Pamphlet]`, which would translate something like `ferocious-panda` to `/usr/ferocious-panda` and renders based on the Pamphlet.js component.

If it's an anonymous link, then using the above slug, the link probably looks like: `/ano/ferocious-panda`

## Scheduling deletes
SQL doesn't have an expiry key so we'll need to do it via cron jobs. Heroku provides a scheduler so it's not too much of a stretch to provide my own script to run. In addition, NPM has a `cron` package, so that can be used in conjunction with Sequelize to run a delete job every week.

## Data Flow
We're using a combination of GraphQL and PostgreSQL to handle data flow and changes. In addition, Apollo will be used to streamline the process a bit so this should be that bad asides from having to spec a schema.

## App State
Probably use Redux to handle querying and mutating data. Since we're performing asynchronous fetches, we also need a library so Redux can handle it. We could use Redux Thunks again, or check out Redux Saga, which means learning iterators. Iterators is a "new" feature as part of the ES6 spec, so this is something that's worth at least investigating really fast.

Will also need to use a [Redux wrapper](https://github.com/kirill-konshin/next-redux-wrapper) for Next.js as it doesn't expose anything for you to use Redux out the box

## Severing the React App With Next.js
If we do use Redux with Next.js, the we'll need to do some funky things in order to get it to work with Next. We'll also need to handle wrapping our page with the Apollo HOC so that might get interesting. The other option is to forgo Redux, but use Redux patterns with React Hooks and Context instead which probably won't save any time if we decide to cache state at any point.

## Testing
Use Jest with React Testing Library for components, but for pages, we want to use Cypress


## CICD things
Will use Circle CI again, it was pretty neat to work with in a previous project. We'll be handling the below with CICD:
- automated testing
- test coverage reporting
- auto tagging