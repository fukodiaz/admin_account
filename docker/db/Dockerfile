FROM redisfab/redis-stack-server:7.0.2-RC1
ADD /docker/db/data/dump.rdb /data/dump.rdb
RUN chmod +x /data
EXPOSE 6379