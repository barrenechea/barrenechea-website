FROM nginx:alpine

# Copy the static website
COPY --chown=nginx:nginx ./public_html /public_html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Quiet entrypoint logs
ENV NGINX_ENTRYPOINT_QUIET_LOGS=1

EXPOSE 3000
