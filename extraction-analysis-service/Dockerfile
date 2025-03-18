FROM python:3.9-slim

WORKDIR /app

# # Install dependencies for Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    libglib2.0-0 \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libatspi2.0-0 \
    libwayland-client0 \
    && rm -rf /var/lib/apt/lists/*

ENV FLASK_APP="app/__init__.py" 

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install playwright browsers
RUN python -m playwright install chromium

COPY . .

# Set Gunicorn configuration with proper timeout and worker settings
ENTRYPOINT ["gunicorn", "--workers=2", "--worker-class=gthread", "--threads=4", "--timeout=120", "--log-level=debug", "--preload", "app:create_app()"]

EXPOSE 8000