# Especificación Técnica de Esquema: `agent.json`

Documento técnico que detalla la estructura formal de un agente personalizado en Antigravity.

## Esquema JSON Formal

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AntigravityCustomAgent",
  "type": "object",
  "required": ["name", "description", "config"],
  "properties": {
    "name": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9_\\-\\.]+$",
      "description": "Identificador único utilizado para invocar al subagente."
    },
    "description": {
      "type": "string",
      "description": "Descripción humana de las capacidades del agente y cuándo debe usarse."
    },
    "hidden": {
      "type": "boolean",
      "default": false,
      "description": "Oculta el agente de listas generales para reservarlo a invocaciones programáticas."
    },
    "config": {
      "type": "object",
      "required": ["customAgent"],
      "properties": {
        "customAgent": {
          "type": "object",
          "required": ["systemPromptSections", "toolNames", "systemPromptConfig"],
          "properties": {
            "systemPromptSections": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["title", "content"],
                "properties": {
                  "title": { "type": "string" },
                  "content": { "type": "string" }
                }
              }
            },
            "toolNames": {
              "type": "array",
              "items": { "type": "string" }
            },
            "systemPromptConfig": {
              "type": "object",
              "properties": {
                "includeSections": {
                  "type": "array",
                  "items": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
}
```
