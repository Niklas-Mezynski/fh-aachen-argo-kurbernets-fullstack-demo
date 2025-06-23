# Demo für das EIT Praktikum zum Thema Argo Workflows

## Argo Installation

### Set the version of Argo Workflows to install

```bash
ARGO_WORKFLOWS_VERSION="v3.5.15"
```

### Install Argo Workflows itself

```bash
kubectl create namespace argo
```

```bash
kubectl apply -n argo -f "https://github.com/argoproj/argo-workflows/releases/download/${ARGO_WORKFLOWS_VERSION}/quick-start-minimal.yaml"
```

### Install ArgoCLI

```bash
# Detect OS
ARGO_OS="darwin"
if [[ "$(uname -s)" != "Darwin" ]]; then
  ARGO_OS="linux"
fi

# Download the binary
curl -sLO "https://github.com/argoproj/argo-workflows/releases/download/${ARGO_WORKFLOWS_VERSION}/argo-$ARGO_OS-amd64.gz"

# Unzip
gunzip "argo-$ARGO_OS-amd64.gz"

# Make binary executable
chmod +x "argo-$ARGO_OS-amd64"

# Move binary to path
mv "./argo-$ARGO_OS-amd64" /usr/local/bin/argo

# Test installation
argo version
```

## Test the Argo Installation

Forward https:

```bash
kubectl -n argo port-forward service/argo-server 2746:2746
```

Hello World Example

```bash
argo submit -n argowatch https://raw.githubusercontent.com/argoproj/argo-workflows/main/examples/hello-world.yaml
```

Argo List

```bash
argo list -n argo
```

## Run the Argo Workflow

For the workflow to be able to update the deployment within the cluster, you need to create a Role (or ClusterRole) and a RoleBinding (or ClusterRoleBinding) for the ServiceAccount used by your workflows.

```bash
kubectl apply -f k8s/role.yml -n argo
kubectl apply -f k8s/rolebinding.yml -n argo
```

Submit workflow to Argo:

```bash
argo submit k8s/argo-workflow.yml -n argo
```

## Lokale Entwicklung der Web-App

Docker image lokal testen

```bash
docker build -t argo-kurbernets-fullstack-demo:demo .
docker run -p 3000:3000 argo-kurbernets-fullstack-demo:demo
```
