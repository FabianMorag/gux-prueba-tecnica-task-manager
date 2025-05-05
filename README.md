# Task manager para rol de desarrollador en [Gux](https://gux.tech/)

## Descripción

El proyecto consiste en una aplicación con registro e inicio de sesión de usuarios, donde ingresan a un dashboard para gestionar tareas. Pueden visualizar las tareas que todos los usuarios creen, pero solo tienen autorización para eliminar o editar sobre sus propias tareas creadas.

El stack de desarrollo consiste en nextjs y tailwind para la creación de interfaces. Para el backend de autorización se utiliza Authjs. Finalmente para las acciones referentes a la base de datos Postgresql se utiliza el orm Prisma.

Los permisos de las rutas se gestionan en el middleware, aunque las acciones sobre las tareas son server actions, por lo que no hay rutas en la api para dichas acciones.

## Requisitos Previos

Para ejecutar este proyecto, solo necesitarás:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/FabianMorag/gux-prueba-tecnica-task-manager.git
cd gux-prueba-tecnica-task-manager
```

### 2. Configuración

No se requieren pasos adicionales de configuración. Todos los servicios y dependencias se manejan a través de Docker.

### 3. Iniciar los servicios

Para iniciar todos los servicios definidos en el archivo docker-compose.yml:

```bash
docker-compose up
```
