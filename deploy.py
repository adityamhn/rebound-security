import subprocess

def deploy_honeypot():
    print("Deploying SSH Honeypot using Docker Compose...")
    subprocess.run(["docker", "compose", "up", "--build", "-d"])

if __name__ == "__main__":
    deploy_honeypot()
