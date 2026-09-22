---
name: agentes-personalizados
description: >-
  Guía completa y generador de agentes personalizados (subagentes) a nivel de proyecto en Antigravity.
  Enseña dónde se almacenan (.agents/agents/<nombre>/agent.json), la especificación de campos JSON
  (systemPromptSections, toolNames, systemPromptConfig), cómo se invocan vía invoke_subagent o define_subagent,
  y cómo orquestar equipos de agentes senior especializados para auditoría de catálogo, UI/UX, SEO y curación de imágenes.
---

# Habilidad: Agentes Personalizados (Custom Agents) en Antigravity

Esta habilidad documenta y estandariza la creación, configuración, almacenamiento y orquestación de **agentes personalizados y especializados** a nivel de proyecto dentro del ecosistema Antigravity.

---

## 1. Arquitectura y Ubicación de Archivos

Los agentes personalizados se definen de manera modular y se almacenan exclusivamente a nivel de proyecto dentro del directorio `.agents/` en la raíz del repositorio:

```text
<project_root>/
└── .agents/
    ├── skills/
    │   └── agentes-personalizados/
    │       ├── SKILL.md                     # Esta guía maestra
    │       ├── references/                  # Documentación extendida
    │       └── templates/                   # Plantillas JSON reutilizables
    └── agents/
        ├── <nombre_agente_1>/
        │   └── agent.json                   # Definición del agente 1
        ├── <nombre_agente_2>/
        │   └── agent.json                   # Definición del agente 2
        └── catalog_curator/
            └── agent.json                   # Auditor de catálogo y concordancia
```

> [!IMPORTANT]
> **Ámbito de Proyecto vs. Global:** Al crearse dentro de `.agents/` en la raíz del proyecto, los agentes son versionados por Git y compartidos con el equipo, sin contaminar la configuración global de la máquina (`~/.gemini/config/`).

---

## 2. Estructura y Campos Obligatorios de `agent.json`

Cada subagente personalizado se define mediante un archivo `agent.json` con el siguiente esquema:

```json
{
  "name": "catalog_curator",
  "description": "Agente senior especializado en auditoría y verificación de catálogo e-commerce: coherencia visual, correspondencia de fotos con descripciones y eliminación de tallas espurias en cosméticos.",
  "hidden": true,
  "config": {
    "customAgent": {
      "systemPromptSections": [
        {
          "title": "Agent System Instructions",
          "content": "Instrucciones de comportamiento, directivas de alta precisión, restricciones y estándares que el agente debe seguir obligatoriamente."
        }
      ],
      "toolNames": [
        "send_message",
        "find_by_name",
        "grep_search",
        "view_file",
        "list_dir",
        "read_url_content",
        "search_web",
        "replace_file_content",
        "multi_replace_file_content",
        "write_to_file",
        "run_command",
        "manage_task"
      ],
      "systemPromptConfig": {
        "includeSections": [
          "user_information",
          "mcp_servers",
          "skills",
          "subagent_reminder",
          "messaging",
          "artifacts",
          "user_rules"
        ]
      }
    }
  }
}
```

### Detalle de Campos:

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Sí** | Identificador único del agente (solo letras minúsculas, números, guiones y guiones bajos). |
| `description` | `string` | **Sí** | Resumen conciso del propósito del agente y cuándo debe ser seleccionado. |
| `hidden` | `boolean` | Opcional | Si es `true`, el agente no se muestra en menús estáticos y se invoca programáticamente. |
| `config.customAgent.systemPromptSections` | `array` | **Sí** | Lista de secciones que forman el prompt del sistema del agente (`title` y `content`). |
| `config.customAgent.toolNames` | `array` | **Sí** | Lista explícita de herramientas a las que tiene acceso el agente (lectura, edición, comandos, mensajes). |
| `config.customAgent.systemPromptConfig.includeSections` | `array` | **Sí** | Secciones del entorno a inyectar en el contexto del agente (`artifacts`, `skills`, `user_rules`, etc.). |

---

## 3. Métodos de Invocación y Comunicación

### A. Invocación Estática (`invoke_subagent`)
Cuando el agente ya está registrado o definido:

```json
{
  "Subagents": [
    {
      "TypeName": "catalog_curator",
      "Role": "Catalog & Category Auditor",
      "Prompt": "Audita todos los productos de las categorías COSMETICA_FACIAL, HIGIENE_CORPORAL y PERFUMERIA en src/lib/demoData.ts. Asegura que ninguna crema o jabón tenga tallas textiles (S, M, L, XL), sino volúmenes (200g, 100ml) y que las fotos concuerden con los títulos.",
      "Model": "inherit",
      "Workspace": "inherit"
    }
  ]
}
```

### B. Declaración Dinámica en Tiempo de Ejecución (`define_subagent`)
Para instanciar un agente especializado al vuelo durante una conversación:

```json
{
  "name": "fashion_image_scraper",
  "description": "Agente para investigar y descargar imágenes de alta resolución de Shein, Pinterest y Zara.",
  "system_prompt": "Eres un especialista en adquisición de activos de moda de alta resolución...",
  "enable_write_tools": true,
  "enable_subagent_tools": false,
  "enable_mcp_tools": false
}
```

### C. Mensajería Bidireccional (`send_message`)
Permite dialogar con el subagente mientras realiza su tarea:

```json
{
  "Recipient": "<conversationId_del_subagente>",
  "Message": "Por favor prioriza los productos de belleza y cremas corporales."
}
```

### D. Monitoreo y Ciclo de Vida (`manage_subagents`)
* `Action: "list"`: Comprueba el estado (`running`, `idle`, `errored`) de todos los subagentes activos.
* `Action: "kill"`: Termina la ejecución de un subagente y libera sus recursos.

---

## 4. Agentes Especializados para Sindy Luxury

Este proyecto cuenta con los siguientes agentes diseñados para resolver los problemas del catálogo:

1. **`catalog_curator`**:
   - **Misión:** Auditar la concordancia estricta entre imagen, nombre, descripción, precio y tallas.
   - **Regla de Oro:** **CERO tallas textiles en cosmética, jabones, cremas y perfumes**. Las cremas usan `details.volume` (`200g`, `100ml`), los calzados usan tallas europeas (`37-40`), los accesorios usan `Talla Única`, y solo la ropa usa `XS`, `M`, `XL`.
2. **`page_builder`**:
   - **Misión:** Refactorizar y maquetar componentes React/TSX responsivos y limpios.
3. **`css_transformer`**:
   - **Misión:** Aplicar el sistema de diseño de lujo (Obsidian Noir, Gold Imperial, Haute Rose).
4. **`seo_architect`**:
   - **Misión:** Mantener actualizados los microdatos Schema.org (`ClothingStore`, `Product`, `Offer`) para Guinea Ecuatorial.
