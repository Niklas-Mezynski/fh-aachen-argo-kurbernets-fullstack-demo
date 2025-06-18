# Demo für das EIT Praktikum zum Thema Argo Workflows

Docker image lokal testen

```bash
docker build -t argo-kurbernets-fullstack-demo:demo .
docker run -p 3000:3000 argo-kurbernets-fullstack-demo:demo
```

Für das lokale k8s deployment muss das image ins cluster importiert werden. Eigentlich würde man hier ein privates Docker-Repository verwenden, aber für das Demo verwenden wir einfach das lokale Docker-Image.

```bash
kind load docker-image argo-kurbernets-fullstack-demo:demo
```
