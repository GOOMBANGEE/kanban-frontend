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
| Build Tool       | vite                                                     |
| CSS Framework    | tailwind prettier-plugin-tailwindcss                     |
| Date Handling    | react-datepicker, date-fns </br> @types/react-datepicker |
| Networking       | axios, socket.io-client                                  |
| Rich Text Editor | react-quill-new, dompurify (Sanitization)                |
| Routing          | react-router-dom                                         |
| State Management | zustand                                                  |

## Development

```
git clone https://github.com/GOOMBANGEE/kanban-frontend.git

cd kanban-frontend
cp example.env .env

npm install

npm run dev
```

### Board

![board](https://github.com/user-attachments/assets/7f2a2b7f-ce93-4415-8b85-528f3a25b289)

### Ticket

![ticket](https://github.com/user-attachments/assets/8d22324d-b7b0-4112-babe-1e79c3056d26)