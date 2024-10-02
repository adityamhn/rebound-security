# Use Python 3.8 as base
FROM python:3.8-slim

# Install necessary system dependencies and pip
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

# Create a non-root user
RUN useradd -ms /bin/bash cowrie_user

# Set working directory and give permissions to the non-root user
WORKDIR /opt/cowrie
RUN chown -R cowrie_user:cowrie_user /opt/cowrie

# Switch to non-root user
USER cowrie_user

# Install Cowrie Python dependencies and Twisted for twistd
RUN pip install -r requirements.txt
RUN pip install twisted

# Check if twistd is installed and available in PATH
RUN twistd --version || echo "Twisted not installed correctly"

# Expose SSH port
EXPOSE 2222

# Start Cowrie SSH
CMD ["bin/cowrie", "start", "-n"]
