FROM node:14

WORKDIR /app

COPY package*.json /app

RUN npm install

ENV TZ=Asia/Seoul

RUN ln -snf /user/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /app

EXPOSE 3000
CMD ["npm", "start"]