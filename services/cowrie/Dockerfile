# Use Python 3.8 as base
FROM python:3.8-slim

# Install necessary system dependencies
RUN apt-get update && \
    apt-get install -y \
    libssl-dev \
    libffi-dev \
    build-essential \
    python3-dev \
    python3-pip \
    git

# Clone the Cowrie repository
RUN git clone https://github.com/cowrie/cowrie.git /opt/cowrie

# Set working directory
WORKDIR /opt/cowrie

# Install Cowrie Python dependencies
RUN pip install -r requirements.txt

# Expose SSH port
EXPOSE 2222

# Start Cowrie SSH
CMD ["bin/cowrie", "start", "-n"]
