# --- Stage 1: Build the Egg---
FROM python:3.11-slim as build-stage
RUN pip install --no-cache-dir scrapyd-client
WORKDIR /build
COPY src/ . 
RUN scrapyd-deploy --build-egg=crawler.egg

# --- Stage 2: Runtime---
FROM python:3.11-slim

# Install system dependencies for Scrapy and Playwright
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libffi-dev \
    libxml2-dev \
    libxslt-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./src/crawler/assets/categories.json .
# Copy requirements and install
# This will now successfully find Playwright 1.57.0+
COPY requirements.txt .
RUN pip install --no-cache-dir scrapyd -r requirements.txt

# IMPORTANT: Install Playwright browsers and their system dependencies
RUN playwright install --with-deps chromium

# Setup Scrapyd config and storage
VOLUME /etc/scrapyd/ /var/lib/scrapyd/
COPY src/scrapyd.conf /etc/scrapyd/scrapyd.conf

# Setup egg directory
RUN mkdir -p /src/eggs/crawler
COPY --from=build-stage /build/crawler.egg /src/eggs/crawler/1.egg

EXPOSE 6800
ENTRYPOINT ["scrapyd", "--pidfile="]
