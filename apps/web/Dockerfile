FROM docker.io/nginx:stable-alpine
ENV PORT 8080

# Copy build artifacts
COPY dist/apps/web /usr/share/nginx/html/

# Copy NGINX config template
COPY apps/web/nginx.conf /etc/nginx/conf.d/configfile.template

# Substitute environment variables in the NGINX config and generate the default config
RUN apk add --no-cache gettext && \
    sh -c "envsubst '$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

# Expose the PORT
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]




# # FROM docker.io/nginx:stable-alpine
# FROM docker.io/nginx:stable-alpine
# ENV PORT 8080
# COPY dist/apps/web/* /usr/share/nginx/html/
# COPY apps/web/nginx.conf /etc/nginx/conf.d/configfile.template
# RUN sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
# CMD ["nginx", "-g", "daemon off;"]
