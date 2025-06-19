# Demo für das EIT Praktikum zum Thema Argo Workflows

Docker image lokal testen

```bash
docker build -t argo-kurbernets-fullstack-demo:demo .
docker run -p 3000:3000 argo-kurbernets-fullstack-demo:demo
```

Lokale Container Registry starten

```bash
kubectl apply -f k8s/docker-registry.yml
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
