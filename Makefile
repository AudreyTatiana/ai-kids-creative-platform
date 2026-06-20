# ─────────────────────────────────────────
# AI Kids Creative Platform — Makefile
# ─────────────────────────────────────────

.PHONY: up down build logs ps clean help

## Démarre tous les services en arrière-plan
up:
	docker compose up -d

## Arrête tous les services
down:
	docker compose down

## Construit les images
build:
	docker compose build --no-cache

## Affiche les logs en temps réel
logs:
	docker compose logs -f

## Affiche le statut des conteneurs
ps:
	docker compose ps

## Arrête et supprime les conteneurs + volumes (⚠️ perte de données)
clean:
	docker compose down -v

## Redémarre tous les services
restart:
	docker compose down && docker compose up -d

## Affiche l'aide
help:
	@echo ""
	@echo "Commandes disponibles :"
	@echo "  make up       — Démarre tous les services"
	@echo "  make down     — Arrête tous les services"
	@echo "  make build    — Reconstruit les images"
	@echo "  make logs     — Affiche les logs"
	@echo "  make ps       — Statut des conteneurs"
	@echo "  make clean    — Supprime tout (⚠️ données perdues)"
	@echo "  make restart  — Redémarre tous les services"
	@echo ""
