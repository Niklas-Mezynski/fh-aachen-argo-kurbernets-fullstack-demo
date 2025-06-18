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

Submit workflow to Argo:

```bash
argo submit k8s/argo-workflow.yml
```
