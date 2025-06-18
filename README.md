# Demo für das EIT Praktikum zum Thema Argo Workflows

Docker image lokal testen

```bash
docker build -t argo-kurbernets-fullstack-demo:demo .
docker run -p 3000:3000 argo-kurbernets-fullstack-demo:demo
```

Bei GH Container Registry hochladen:

```bash
docker tag argo-kurbernets-fullstack-demo:latest ghcr.io/niklas-mezynski/argo-kurbernets-fullstack-demo:latest
docker push ghcr.io/niklas-mezynski/argo-kurbernets-fullstack-demo:latest
```

Add Cluster Credentials for the workflow to work

```bash
kubectl create secret -n argo docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<your-github-username> \
  --docker-password=<your-personal-access-token> \
  --docker-email=<your-email>
```

For the workflow to be able to update the deployment within the cluster, you need to create a Role (or ClusterRole) and a RoleBinding (or ClusterRoleBinding) for the ServiceAccount used by your workflows.

```bash
kubectl apply -f k8s/argo-deployer-role.yaml
kubectl apply -f k8s/argo-deployer-rolebinding.yaml
```

Submit workflow to Argo:

```bash
argo submit k8s/argo-workflow.yml -n argo
```

- Container-native: Entwickelt, um direkt mit Containern zu arbeiten und deren Vorteile wie Isolation und Portabilität zu nutzen.
- Workflow Engine: Software, die komplexe Abläufe (Workflows) aus einzelnen Schritten automatisiert und steuert.
- Orchestrieren: Das automatische Verwalten, Starten und Koordinieren von Abläufen oder Diensten.
- Parallele Jobs: Mehrere Aufgaben, die gleichzeitig (parallel) ausgeführt werden.
- Kubernetes: Eine Open-Source-Plattform zur Verwaltung und Automatisierung von Container-Anwendungen.
