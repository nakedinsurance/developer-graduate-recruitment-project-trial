# Pull postgresql image
FROM postgres:13-alpine

# Copy initialization script to the initialization directory inside of the container
COPY local_db.sql /docker-entrypoint-initdb.d/