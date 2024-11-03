import subprocess

def deploy_honeypot():
    # Remove old data
    subprocess.run(['sudo', 'rm', '-rf', './attacklogdata'])
    subprocess.run(['sudo', 'rm', '-rf', './services/dionaea/data/'])
    subprocess.run(['sudo', 'rm', '-rf', './services/dionaea/log'])
    
    # Recreate the necessary directory structure
    subprocess.run(['sudo', 'mkdir', '-p', './services/dionaea/data'])
    
    # Create the dionaea.sqlite file
    subprocess.run(['sudo', 'touch', './services/dionaea/data/dionaea.sqlite'])
    subprocess.run(['sudo', 'ls', './services/dionaea/data/dionaea.sqlite'], check=True)
    
    # Set permissions
    subprocess.run(['sudo', 'chmod', '-R', '777', './services/dionaea/data/dionaea.sqlite'])
    
    print("Deploying SSH Honeypot using Docker Compose...")
    subprocess.run(["docker", "compose", "up", "--build", "-d"])

if __name__ == "__main__":
    deploy_honeypot()
