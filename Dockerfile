FROM node:22-alpine

WORKDIR /app

COPY TODO/todo_backend/package*.json ./TODO/todo_backend/
RUN cd /app/TODO/todo_backend && npm install

COPY TODO/todo_frontend/package*.json ./TODO/todo_frontend/
RUN cd /app/TODO/todo_frontend && npm install

COPY . .

RUN cd /app/TODO/todo_frontend && npm run build
RUN mkdir -p /app/TODO/todo_backend/static
RUN rm -rf /app/TODO/todo_backend/static/build
RUN cp -r /app/TODO/todo_frontend/build /app/TODO/todo_backend/static/

WORKDIR /app/TODO/todo_backend

EXPOSE 5000

CMD ["npm", "start"]