FROM mhart/alpine-node:6

WORKDIR /app/ops

COPY . .

RUN chmod +x /app/ops/bin/ops.js

CMD /app/ops/bin/ops.js
