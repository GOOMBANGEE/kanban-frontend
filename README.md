# Kanban

텍스트 및 이미지를 통해 일정을 관리하고 팀원을 추가하여 작업을 공유할 수 있습니다.

Created with [React](https://react.dev/) + [Vite](https://vite.dev/) +  [Tailwind CSS](https://tailwindcss.com/)

## Requirements

- TypeScript
- React 19.0.0
- Node.js >= 20
- Vite v6
- Tailwind CSS v4

## Dependencies

| Feature          | Package                                                  |
|:-----------------|:---------------------------------------------------------|
| State Management | zustand                                                  |
| Networking       | axios, socket.io-client                                  |
| Routing          | react-router-dom                                         |
| Rich Text Editor | react-quill-new, dompurify (Sanitization)                |
| Date Handling    | react-datepicker, date-fns </br> @types/react-datepicker |

## Development

```
git clone https://github.com/GOOMBANGEE/kanban-frontend.git

cd kanban-frontend
cp example.env .env

npm install

npm run dev
```