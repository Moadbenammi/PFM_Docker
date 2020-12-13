FROM node
WORKDIR /Users/hp/Desktop/dockerProjects
COPY package*.json  ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","resources/app.js"]