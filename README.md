# PublicAttorneyMatching_Server
## 초기 시작
### 로컬 서버 실행 시 npm install
### .env 파일 작성 필요
### image 폴더 생성 필요
### db/mysql_data, db/mysql_config, db/redis_data 폴더 생성 필요 

## docker run
### docker stop express_server
### docker rm express_server
### docker rmi server
### docker build . -t server
### run -d -p 3000:3000 --name express_server -it --link mysql_server:mysql_server --link redis_server:redis_server --net=githubwebhook_default -v ./image:/app/image server
