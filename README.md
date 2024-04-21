# О проекте

Vue 3 Composition API typescript проект

## Подготовка проекта

Установка зависимостей

```bash
$ yarn install
```

## Запуск проекта

Для запуска выполните команду

```bash
$ yarn serve
```

### TypeScript, ESLint, Prettier, Husky

```bash
# Проверка eslint
$ yarn lint

# Исправление ошибок prettier
$ yarn prettier:fix

```

В проекте используется husky. При коммите запускается pre-commit hook, который запускает команды на проверку типов,
линтер, prettier.
Так же проверяется сообщение коммита.

### Валидный шаблон сообщения коммита:

```bash
chore: first commit
fix(server): #13 send cors headers
feat(blog): add comment section
```
