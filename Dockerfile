FROM nginx:latest
VOLUME /raor_dev_volume
RUN rm -rf /etc/nginx/conf.d/default.conf
# ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY conf /etc/nginx
ADD ./build /usr/share/nginx/html