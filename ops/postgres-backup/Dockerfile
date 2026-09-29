FROM postgres:18-alpine
RUN apk add --no-cache aws-cli
COPY backup.sh /usr/local/bin/backup.sh
RUN chmod 700 /usr/local/bin/backup.sh
ENTRYPOINT ["/usr/local/bin/backup.sh"]
