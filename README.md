# COMP4480-Chatbot
Chatbot Web con OpenAI, Node.js y SQLite

Descripcion

Este proyecto consiste en el desarrollo de un chatbot web utilizando Node.js, Express, y la API de OpenAI.
El sistema permite a los usuarios interactuar con un modelo de inteligencia artificial a traves de una interfaz web sencilla, mientras que las conversaciones se almacenan en una base de datos local utilizando SQLite. El chatbot incluye memoria conversacional, lo que significa que puede recordar mensajes anteriores dentro de la conversación.


Tecnologías utilizadas:

- Node.js

- Express.js

- OpenAI API

- SQLite

- Codigo HTML, CSS y JavaScript

- dotenv

- cors


Estructura del proyecto:

COMP4480 - Chatbot
|
├── index.js
├── package.json
├── .env
|
├── database/
|    └── chat.db
|
└── public/
     ├── index.html
     ├── script.js
     ├── style.css


Instalacion y configuracion:

Paso 1. Clonar el repositorio

	git clone <URL_DEL_REPOSITORIO>
	
	cd COMP4480 - Chatbot

Paso 2. Instalar dependencias

	npm install express openai dotenv sqlite3 cors

Paso 3. Configurar variables de entorno

	Crear un archivo .env en la raiz del proyecto con el siguiente contenido:
	OPEN_API_KEY=YOUR API KEY HERE


Ejecucion del proyecto:
Iniciar el servidor
	node index.js

Abrir en el browser
	http://localhost:3000


Funcionalidades principales:

- Interfaz web para interactuar con el chatbot

- Memoria conversacional (recuerda mensajes anteriores)

- Almacenamiento de mensajes en base de datos SQLite

- API REST para comunicación frontend-backend

- Endpoint /history para visualizar el historial completo


Flujo del sistema:

	Usuario (navegador)
		↓
	Frontend (HTML + JS)
		↓
	Servidor (Express)
		↓
	Base de datos (SQLite)
		↓
	API de OpenAI
		↓
	Respuesta al usuario


Consideraciones:

- Es necesario contar con una API key válida de OpenAI

- El uso de la API puede generar costos según el consumo

- La base de datos crece con cada interacción (se recomienda limitar mensajes en futuras mejoras)


Autor:
Proyecto desarrollado por: Antonio A. Baez Soto
Curso: COMP4480.ARTIFICIAL INTELLIGENCE


Licencia:

Este proyecto es de uso academico y educativo
