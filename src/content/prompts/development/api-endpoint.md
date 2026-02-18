---
title: "API endpoint dizaynı"
slug: "api-endpoint"
category: "development"
difficulty: "intermediate"
models: ["gemini", "gpt"]
tags: ["api", "rest", "backend", "endpoint"]
---

Bu prompt verilmiş funksiya üçün tam speksifikasiyalı REST API endpoint dizayn etməyə kömək edir.

PROMPT:

Sən təcrübəli backend mühəndisisən. [Funksiya və ya resursun qısa təsviri: məs: istifadəçi qeydiyyatı, sifariş yaratma] üçün REST API endpoint dizayn et.

**Kontekst:** [Layihə və ya sistem: məs: e-ticarət API, mobil tətbiq backend.]

**Dizayn tələbləri:**
- **URL strukturu:** Resource-based, versiyalı (v1) və ya sadə — [Seçiminizi qeyd edin.]
- **HTTP metod:** GET / POST / PUT / PATCH / DELETE — hansı əməliyyat üçün nə istifadə olunacaq.
- **Request body:** Zəruri və optional sahələr, nümunə JSON.
- **Response:** Uğurlu cavab strukturu (status kod, data formatı).
- **Error halları:** Gözlənilən xətalar (4xx, 5xx) və cavab formatı (məs: `{ "error": "...", "code": "..." }`).
- **Auth:** [Lazımdırsa: Bearer token / API key / yox.]

**Çıxış formatı:** URL, method, request/response nümunələri və qısa izah.

Funksiya / Resurs: