FROM mysql:latest

RUN chown -R mysql:root /var/lib/mysql/


ENV MYSQL_DATABASE="Pr-inpt"
ENV MYSQL_USER="root"
ENV MYSQL_PASSWORD=""
ENV MYSQL_ROOT_PASSWORD="rootroot"

ADD pr-inpt-database.sql /etc/mysql/data.sql
RUN sed -i 's/MYSQL_DATABASE/'$MYSQL_DATABASE'/g' /etc/mysql/data.sql
RUN cp /etc/mysql/data.sql /docker-entrypoint-initdb.d

EXPOSE 3306