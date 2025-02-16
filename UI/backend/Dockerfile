FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install yarngpt from GitHub
RUN pip install git+https://github.com/saheedniyi02/yarngpt.git

# Copy the rest of the application
COPY . .

# Command to run the application
CMD ["python", "run.py"] 