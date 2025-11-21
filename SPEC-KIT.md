# SPEC-KIT: Reactor Studio (Full Stack Specification)

Este documento serve como a "Fonte da Verdade" para o desenvolvimento e integração do Reactor Studio. Ele contém a estrutura do projeto, definições de tipos e o prompt necessário para gerar o Backend em Python usando LLMs (Gemini).

---

## 1. Arquitetura do Projeto

O Reactor Studio é uma aplicação web para automação de vídeos de reação usando avatares de IA.

*   **Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion. (Atualmente rodando com `MockBackendService`).
*   **Backend (A ser gerado):** Python, FastAPI, SQLAlchemy (SQLite), Celery/BackgroundTasks.
*   **Core AI/Processing:** `yt-dlp` (extração de vídeos), TTS (Text-to-Speech), Lip-Sync Engines.
*   **Armazenamento:** Local (dev) / S3 ou R2 (prod).

---

## 2. Estrutura de Pastas (Local Development)

Ao clonar o repositório, a estrutura sugerida é:

```text
/reactor-studio
├── /frontend             # Código React atual
│   ├── src
│   │   ├── components    # UI, Auth, Video
│   │   ├── contexts      # AuthContext
│   │   ├── pages         # Rotas da aplicação
│   │   ├── services      # Camada de API (api.ts)
│   │   └── types.ts      # Definições de tipos compartilhados
│   └── package.json
│
├── /backend              # Código Python (Gerar com o prompt abaixo)
│   ├── main.py           # Entrypoint FastAPI
│   ├── models.py         # Banco de Dados
│   ├── schemas.py        # Pydantic Models (espelho do types.ts)
│   ├── tasks.py          # Lógica de processamento de vídeo
│   └── requirements.txt
```

---

## 3. 🤖 Prompt para Geração do Backend (Gemini CLI)

Copie o conteúdo abaixo e envie para o Gemini (via AI Studio ou CLI) para gerar o código do servidor Python compatível com este frontend.

```markdown
Atue como um Engenheiro de Software Sênior Full Stack.
Preciso criar o Backend em Python (FastAPI) para o projeto "Reactor Studio".
O frontend já existe em React/TypeScript. O backend deve substituir os serviços mockados atuais.

### ESPECIFICAÇÕES TÉCNICAS

1. **Stack:**
   - Framework: FastAPI
   - Validação: Pydantic
   - Banco de Dados: SQLite (com SQLAlchemy)
   - Processamento: FastAPI BackgroundTasks (para simular filas assíncronas)
   - Ferramentas de Vídeo: yt-dlp (para análise de metadados)

2. **Modelos de Dados (Espelhar Frontend `types.ts`):**

   Use estas definições TypeScript como referência para criar os Schemas Pydantic:

   ```typescript
   enum VideoStatus { QUEUED='queued', PROCESSING='processing', COMPLETED='completed', FAILED='failed' }
   
   interface CreateReactionRequest {
     videoId: string; // URL ou ID temporário
     avatarId: string;
     style: string;
     voice: string;
     position: string;
     size: number;
   }

   interface VideoAnalysisResult {
     videoId: string;
     url: string;
     title: string;
     thumbnailUrl: string;
     duration: number; // segundos
     platform: 'youtube' | 'tiktok' | 'instagram' | 'upload';
   }

   interface Reaction {
     id: string;
     status: VideoStatus;
     progress: number; // 0-100
     currentStep: string;
     finalVideoUrl?: string;
     // ... outros campos padrão (createdAt, etc)
   }
   ```

3. **Endpoints Necessários:**

   - `POST /api/analyze`: Recebe `{url: string}`. Executa `yt-dlp --dump-json` para extrair título, thumbnail e duração. Retorna `VideoAnalysisResult`.
   - `POST /api/reaction`: Recebe `CreateReactionRequest`. Cria registro no DB com status `QUEUED` e inicia `BackgroundTasks`. Retorna o objeto criado.
   - `GET /api/reaction/{id}`: Retorna o estado atual do processamento.
   - `POST /api/batch`: Para download em massa (recebe lista de URLs ou canal).
   - `GET /api/batch/{id}`: Status do lote.

4. **Lógica de Processamento (Simulação):**
   No arquivo `tasks.py`, crie uma função `process_video_task(reaction_id: str, db: Session)`:
   - Deve atualizar o status no banco de dados progressivamente.
   - Use `time.sleep()` para simular as etapas: "Baixando", "Gerando Áudio", "Lip-Sync", "Renderizando".
   - Ao final, atualize status para `COMPLETED` e defina uma `finalVideoUrl` dummy.
   - **Importante:** Deixe comentários `# TODO: INTEGRATE AI SCRIPT HERE` onde eu colocarei meus scripts reais de IA.

5. **Output Esperado:**
   Gere o código completo para:
   - `main.py` (App, CORS, Rotas)
   - `models.py` (SQLAlchemy Tables)
   - `schemas.py` (Pydantic)
   - `tasks.py` (Lógica Background)
   - `database.py` (Conexão SQLite)
```

---

## 4. Guia de Integração

Após gerar o backend com o prompt acima:

1.  **Inicie o Backend:**
    ```bash
    cd backend
    pip install fastapi uvicorn sqlalchemy pydantic yt-dlp
    uvicorn main:app --reload --port 8000
    ```

2.  **Atualize o Frontend (`src/services/api.ts`):**
    Você deve substituir a classe `MockBackendService` por chamadas reais `fetch`.

    ```typescript
    // Exemplo de substituição em src/services/api.ts
    const API_URL = "http://localhost:8000/api";

    export const api = {
      async analyzeVideo(url: string): Promise<VideoAnalysisResult> {
        const res = await fetch(`${API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        if (!res.ok) throw new Error('Failed to analyze');
        return res.json();
      },

      async createReaction(req: CreateReactionRequest): Promise<Reaction> {
        const res = await fetch(`${API_URL}/reaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req)
        });
        return res.json();
      },
      
      async getReaction(id: string): Promise<Reaction> {
        const res = await fetch(`${API_URL}/reaction/${id}`);
        return res.json();
      }
      // ... implementar os outros métodos (getBatch, etc)
    };
    ```

---

## 5. Checklist de Funcionalidades (Frontend)

- [x] **Landing Page:** Input de vídeo com validação visual.
- [x] **Preview:** Exibição de metadados do vídeo.
- [x] **Seleção de Avatar:** Galeria e Upload (Mock visual).
- [x] **Customização:** Configuração de voz, estilo e posição.
- [x] **Login Adiado:** O usuário pode configurar tudo e só logar na hora de gerar.
- [x] **Status em Tempo Real:** Polling implementado na página `/processing`.
- [x] **Download em Massa:** Interface para Canais, Playlists e Perfis.
- [x] **Gerador de Imagens:** Integração com Gemini 3 Pro via `window.aistudio`.

---

## 6. Scripts Python Externos (Futuro)

Quando você integrar seus scripts reais no backend, substitua a lógica de simulação em `tasks.py`.

*   **Entrada:** `video_url`, `avatar_image`, `audio_voice_id`.
*   **Processo:**
    1.  `yt-dlp` baixa o vídeo original.
    2.  `whisper` (ou similar) transcreve e gera legendas/roteiro.
    3.  LLM gera o texto de reação baseada no roteiro.
    4.  TTS gera o áudio da reação.
    5.  SadTalker/Wav2Lip gera o vídeo do avatar falando.
    6.  FFmpeg faz o overlay do avatar sobre o vídeo original.
