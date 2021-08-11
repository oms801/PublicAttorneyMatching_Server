# PublicAttorneyMatching_Server 
- 행정사 매칭 앱의 서버입니다.

- 개발 스택 : Nodejs Express, MySQL, Redis, Docker, Jenkins
<br>
<br>

## 초기 시작
- 로컬 서버 실행 시 npm install 

- .env 파일 작성 필요

- /image 폴더 생성 필요

- /db/mysql_data, /db/mysql_config, /db/redis_data 폴더 생성 필요
<br>
<br>

## jenkins execute command
- docker stop express_server

- docker rm express_server

- docker rmi server

- docker build . -t server

- run -d -p 3000:3000 --name express_server -it --link mysql_server:mysql_server --link redis_server:redis_server --net=githubwebhook_default -v ./image:/app/image server
