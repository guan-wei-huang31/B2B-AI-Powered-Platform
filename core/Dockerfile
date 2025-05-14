#####################
# Stage 1: Build
#####################
FROM python:3.11-slim as builder

WORKDIR /install

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --upgrade pip && \
    pip wheel --no-cache-dir --wheel-dir=/wheels -r requirements.txt

#####################
# Stage 2: Runtime
#####################
FROM python:3.11-slim AS runner

WORKDIR /core

COPY --from=builder /wheels /wheels
COPY --from=builder /install/.env /

RUN pip install --no-cache-dir /wheels/* && \
    pip install uvicorn[standard] && \
    pip install gunicorn

COPY core /core

RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /core

RUN mkdir -p /chroma_db && chown -R appuser:appuser /chroma_db

USER appuser

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

WORKDIR /

CMD ["gunicorn", "core.main:app", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "--timeout", "30", "--preload"]
