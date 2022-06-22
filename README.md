# OZON - Test técnico - Frontend Developer

## Requisitos

* ✅ Se debe permitir buscar de forma parcial (ej. Si buscamos “mew” se tienen que
mostrar los pokemones que coincidan con la búsqueda: mew, mewtwo, 
mewtwo-mega-x, etc).
* ✅ Implementar paginación de los pokemones.
* ✅ Incluir tests unitarios.
* ✅ Usar un linter.
* ✅ Gestionar projecto con git.
* ✅ Hostear el proyecto.

## Scripts

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo. Por defecto se encuentra en [http://localhost:3000](http://localhost:3000).

### `npm test`

Ejecutar tests (jest) en modo interactivo. Ver [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run lint`

Ejecuta el linter de la aplicación (eslint) para verificar errores o alertas en el código.

### `npm run build`

Prepara la aplicación para producción en el directorio `build`. Consultar [deployment](https://facebook.github.io/create-react-app/docs/deployment) para más información.

### `npm run eject`

**Nota: Solo se puede ejecutar una vez.**

## Create React App

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Novedades

### UI - Listado de pokemones

El mockup no saca provecho del espacio horizontal además de que se ve vacío por falta de información:

![image](https://user-images.githubusercontent.com/26050475/175119326-b3474351-27a7-4543-b23f-cf60ddbcd6d6.png)

Por lo tanto se implementó como una cuadrícula:

![image](https://user-images.githubusercontent.com/26050475/175119711-0c6add20-930b-42cd-bcea-c56b7f239e65.png)

### API - Obtención de datos

El endpoint para listar los pokemones no provee una manera de gestionar los siguientes dos requerimientos:

1. Búsqueda por coincidencia.
2. Obtención de la imagen de los pokemones (Hay que recurrir al detalle del pokémon).

Por lo tanto se optó por:

1. **Búsqueda por coincidencia**: Obtener todo el listado la primera vez para realizar la búsqueda correctamente.
2. **Obtención de la imagen de los pokemones**: La obtención de la imagen se hace de manera progresiva de acuerdo a la página o la búsqueda del usuario.
