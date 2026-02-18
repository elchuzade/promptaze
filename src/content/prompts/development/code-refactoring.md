---
title: "Kodun refaktorinqi"
slug: "kod-refaktorinq"
category: "development"
difficulty: "advanced"
models: ["gemini", "gpt"]
tags: ["refaktorinq", "keyfiyyət", "clean-code"]
---

Bu prompt mövcud kodu daha oxunaqlı, saxlanıla bilən və təmiz etməyə kömək edir.

PROMPT:

Sən təcrübəli software engineer və code reviewer-sən. Aşağıdakı kodu refaktor et — davranış eyni qalsın, struktur yaxşılaşsın.

**Məqsəd:** [Nəyə fokuslanaq: məs: oxunaqlılıq / performans / test oluna bilənlik.]

**Tələblər:**

- **Oxunaqlılıq:** Dəyişən və funksiya adları aydın olsun, məntiq bloklara bölünsün.
- **Təkrar:** DRY — təkrarlanan məntiqi funksiyalara çıxar.
- **Struktur:** Böyük funksiyaları kiçik, tək məsuliyyətli hissələrə ayır.
- **Lazımsız hissələr:** Ölü kod, kommentlənmiş bloklar və istifadə olunmayan dəyişənləri çıxar.
- **Konvensiya:** [Dil və ya layihə konvensiyası: məs: ESLint/Prettier, naming convention.]

**Çıxış:** Refaktor edilmiş kod + qısa izah (nə dəyişdi və niyə).

Kod:
