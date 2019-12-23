# Contributing

## Installing dependencies

In order to setup the project, install all the project's dependencies:

```
npm install
```

## Linting

The project is developed using the `ECMAScript 2018` standards. To lint the developed code, run: 

```
npm run lint
```

To fix all the automatically fixable errors, run:

```
npm run lint-fix
```

## Testing

For unit test development, the `jest` library is being used. To run all test suites, run:

```
npm test
```

In order to perform coverage analysis, building a detailed report, run:

```
npm run test-coverage
```

In order to run mutation testing:

```
npm run test-mutation
```

In order to run the acceptence tests suites:

```
npm run acceptance-test
```

## Branching Guidelines

To start working on a new feature, enhancement, fix, or other task type, create a branch using the structure `<task-type>/<task-description> ` using **kebab case**. A few examples are:

- `feature/creadentials-specification`
- `enhancement/crawling-optimization`
- `fix/cves-listing`

## Commit Guidelines

Commit messages should follow the **imperative format**. A few examples are:

- Add authentication module
- Refactor crawling module
- Enhance tech detector test suites
- Remove deprecated module
- Fix typo in README

## Coding Guidelines

Variables should be named using **snake case**.

Functions should be named using **camel case**.

Classes should be named using **pascal case**.

"Business logic" should be placed under the `src` directory. Tool commands should be placed under the `src/commands` directory. Tests should be placed under the `test` directory.